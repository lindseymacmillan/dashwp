<?php
/**
 * DashWP Post Types API
 *
 * @package DashWP
 */

namespace DashWP;

defined( 'ABSPATH' ) || exit;

require_once DASHWP_ABSPATH . '/includes/api/class-api.php';

/**
 * Functionality and actions specific to the post types API
 */
class Post_Types_API extends API {

	/**
	 * The route of the API
	 *
	 * @var string
	 */
    protected static $route = 'post_types';

    // API Actions 
    // denoted by 'action_' prefix followed by type

    public function action_create($data) {
        $name = preg_replace('/\s+/', '_', strtolower($data['name']));
        $labels = [
            'name' => $data['plural_name'],
            'singular_name' => $data['name'],
            'edit_item' => 'Edit ' . $data['name'],
            'new_item' => 'New ' . $data['name'],
            'view_items' => 'View ' . $data['plural_name']
        ];
        $args = [
            'labels' => $labels,
            'show_in_menu' => (bool) $data['show_in_menu'],
            'public' => true,
            'show_in_rest' => true,
            'show_ui' => true,
        ];
        $fields = [
            [
                'type' => 'text',
                'label' => 'Title',
                'action' => 'dwp_title'
            ],
            [
                'type' => 'textarea',
                'label' => 'Excerpt',
                'action' => 'dwp_excerpt'
            ]
        ];
        $id = wp_insert_post([
            'post_type' => 'dwp_pt',
            'post_title' => 'dwp_cpt_' . $name,
            'post_status' => 'publish',
            'meta_input' => [
                'dwp_post_args' => $args,
                'dwp_card_fields' => $fields
            ]
        ]);
        return $id;
    }

    public function action_query($data) {
        $postTypes = [];
        $posts = get_posts([
			'post_type' => 'dwp_pt',
			'post_status' => 'publish'
		]);
		foreach($posts as $postType) {
			if (strpos($postType->post_title, 'dwp_cpt_') === 0) {
                $name = 'dwp_' . substr($postType->post_title, 8);
                $custom = true;
			} else if (strpos($postType->post_title, 'dwp_pt_') === 0) {
                $name = substr($postType->post_title, 7);
                $custom = false;
            }
            $object = get_post_type_object($name);
            $fields = get_post_meta($postType->ID, 'dwp_card_fields', true);
            array_push( $postTypes, [
                'name' => $name,
                'id' => $postType->ID,
                'custom' => $custom,
                'object' => $object,
                'card_fields' => $fields
            ]);
        }
        return $postTypes;
    }

    public function action_update($data) {
        $labels = [];

        if (!empty($data['plural_name'])) {
            $labels['name'] = $data['plural_name'];
            $labels['view_items'] = 'View ' . $data['plural_name'];
        }

        if (!empty($data['name'])) {
            $labels['singular_name'] = $data['name'];
            $labels['edit_item'] = 'Edit ' . $data['name'];
            $labels['new_item'] = 'New ' . $data['name'];
        }

        $args = [
            'labels' => $labels,
            'public' => true,
            'show_in_rest' => true,
            'show_ui' => true,
        ];

        if (!empty($data['show_in_menu'])) {
            $args['show_in_menu'] = $data['show_in_menu'] === 'true' ? true : false;
        }

        $argsUpdate = update_post_meta($data['id'], 'dwp_post_args', $args);

        $fieldsUpdate = false;
        if (!empty($data['card_fields'])) {
            $fieldsUpdate = update_post_meta($data['id'], 'dwp_card_fields', $data['card_fields']);
        }
        $update = ['updated_args' => $argsUpdate, 'updated_fields' => $fieldsUpdate];
        return $update;

    }

    public function action_delete($data) {
        $deleted = wp_delete_post($data['id'], true);
        return $deleted;
    }

	
}
