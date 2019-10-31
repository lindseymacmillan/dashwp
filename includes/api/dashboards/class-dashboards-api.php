<?php
/**
 * DashWP Conributors API
 *
 * @package DashWP
 */

namespace DashWP;

defined( 'ABSPATH' ) || exit;

require_once DASHWP_ABSPATH . '/includes/api/class-api.php';

/**
 * Functionality and actions specific to the dashboards API
 */
class Dashboards_API extends API {

	/**
	 * The route of the API
	 *
	 * @var string
	 */
    protected static $route = 'dashboards';

    // API Actions 
    // denoted by 'action_' prefix followed by type

    public function action_create($data) {
        $dashboard = wp_insert_term($data['name'], 'dwp_dashboard', [
            'description' => $data['description']
        ]);
        $supported = ['post', 'page'];
        $meta_supported = add_term_meta($dashboard['term_id'], 'dwp_supported_types', $supported);
        $meta_linked = add_term_meta($dashboard['term_id'], 'dwp_linked_content', 0);
        return $dashboard;
    }

    public function action_update($data) {
        $dashboard = wp_update_term($data['id'], 'dwp_dashboard', [
            'name' => $data['name'],
            'description' => $data['description']
        ]);

        if (!empty($data['supported_post_types'])) {
            $supported = $data['supported_post_types'];
        } else {
            $supported = [];
        }
        $meta_supported = update_term_meta($data['id'], 'dwp_supported_types', $supported);

        if (!empty($data['linked_content'])) {
            $linked = $data['linked_content'];
        } else {
            $linked = 0;
        }
        $meta_linked = update_term_meta($data['id'], 'dwp_linked_content', $linked);

        return $dashboard;
    }

    public function action_query($data) {
        $terms = get_terms( [
            'taxonomy' => 'dwp_dashboard',
            'hide_empty' => false,
        ]);
        $dashboards = [];
        foreach ($terms as $term) {
            $dashboard = [
                'id' => $term->term_id,
                'name' => $term->name,
                'description' => $term->description,
            ];

            $supported = get_term_meta($term->term_id, 'dwp_supported_types', true);
            $supported_types = [];
            $supported_type_objects = [];
            foreach ($supported as $type) {
                $object = get_post_type_object($type);
                if ($object != null) {
                    array_push($supported_type_objects, $object);
                    array_push($supported_types, $type);
                }
            }
            $dashboard['supported_types'] = $supported_types;
            $dashboard['supported_type_objects'] = $supported_type_objects;

            $filters = [[
                'label' => 'All',
                'type' => 'any'
            ]];
            foreach ($supported_type_objects as $supported_type) {
                $filter = [
                    'label' => $supported_type->labels->name,
                    'type' => $supported_type->name
                ];
                array_push($filters, $filter);
            }
            $dashboard['filters'] = $filters;

            $views = [
                [
                    'label' => 'Grid',
                    'name' => 'grid',
                    'icon' => 'grid-view'
                ],
                [
                    'label' => 'List',
                    'name' => 'list',
                    'icon' => 'excerpt-view'
                ]
            ];
            $dashboard['views'] = $views;

            $linked_id = get_term_meta($term->term_id, 'dwp_linked_content', true);

            switch ($linked_id) {
                case 0:
                    $linked_label = 'No content selected';
                    break;
                default:
                    $linked_object = get_post($linked_id);
                    $linked_type = get_post_type_object($linked_object->post_type);
                    $linked_label = 'Edit ' . strtolower($linked_type->labels->singular_name);
            }
            
            $linked_content = [
                'id' => $linked_id,
                'label' => $linked_label
            ];
            $dashboard['linked_content'] = $linked_content;

            array_push($dashboards, $dashboard);
        }
        return $dashboards;
    }

    public function action_delete($data) {
        $deleted = wp_delete_term($data['id'], 'dwp_dashboard');
        return $deleted;
    }

    public function action_content_query($data) {

        $post_types = get_post_types(['public' => true], 'names');
        unset($post_types['attachment']);
        unset($post_types['dwp_pt']);

        $args = [
            'numberposts' => -1,
            'post_type'   => $post_types,
            'post_status' => 'any',
        ];

        $posts = get_posts($args);
        $content = array_map([__CLASS__, 'format_content_options'], $posts);

        $options = array_merge([['label' => 'None', 'value' => 0]], $content);
        return $options;
    }

    public function format_content_options($content) {
        $option = [
            'label' => $content->post_title,
            'value' => $content->ID
        ];
        return $option;
    }
    
}
