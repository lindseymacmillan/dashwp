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

            $linked_content = get_term_meta($term->term_id, 'dwp_linked_content', true);
            $dashboard['linked_content'] = $linked_content;

            array_push($dashboards, $dashboard);
        }
        return $dashboards;
    }

    public function action_delete($data) {
        $deleted = wp_delete_term($data['id'], 'dwp_dashboard');
        return $deleted;
    }
    
}
