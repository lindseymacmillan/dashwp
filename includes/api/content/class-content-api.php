<?php
/**
 * DashWP Content API
 *
 * @package DashWP
 */

namespace DashWP;

defined( 'ABSPATH' ) || exit;

require_once DASHWP_ABSPATH . '/includes/api/class-api.php';

/**
 * Functionality and actions specific to the content API
 */
class Content_API extends API {

	/**
	 * The route of the API
	 *
	 * @var string
	 */
    protected static $route = 'content';

    protected static $post_object;
    protected static $post_args;

    // API Actions 
    // denoted by 'action_' prefix followed by type

    public function action_create($data) {

        $args = [
            'post_type' => $data['post_type'],
        ];

        $fields = $data['fields'];
        foreach ($fields as $field) {
            if ($field['action'] === 'dwp_title') {
                if (!empty($field['value'])) {
                    $args['post_title'] = $field['value'];
                }
            }

            if ($field['action'] === 'dwp_excerpt') {
                if (!empty($field['value'])) {
                    $args['post_excerpt'] = $field['value'];
                }
            }
        }

        $post = wp_insert_post($args);

        if ($post !== 0) {
            $assigned = wp_set_object_terms(
                $post, 
                [$data['dashboard_name']],
                'dwp_dashboard',
                false
            );
        }
        return $post;
    }

    public function action_update($data) {

        self::$post_args = [
            'ID' => $data['id'],
        ];

        $fields = array_map([__CLASS__, 'set_field_values'], $data['fields']);

        // $fields = $data['fields'];
        // foreach ($fields as $field) {
        //     if ($field['action'] === 'dwp_title') {
        //         $args['post_title'] = $field['value'];
        //     }

        //     if ($field['action'] === 'dwp_excerpt') {
        //         $args['post_excerpt'] = $field['value'];
        //     }

        //     if ($field['action'] === 'meta') {
        //         $args['post_excerpt'] = $field['key'];
        //         $meta = update_post_meta($data['id'], $field['key'], $field['value']);
        //     }
        // }

        $args = self::$post_args;
        $post = wp_update_post($args);
        return $post;
    }

    public function set_field_values($field) {
        switch ($field['action']) {
            case 'dwp_title':
                self::$post_args['post_title'] = $field['value'];
                break;
            case 'dwp_excerpt':
                self::$post_args['post_excerpt'] = $field['value'];
                break;
            case 'meta':
                $meta = update_post_meta(self::$post_args['ID'], $field['key'], $field['value']);
                break;
            case 'eval':
                if (!empty($field['save'])) {
                    $id = $post_args['ID'];
                    $value = $field['value'];
                    eval($field['save']);
                }
            default: 
                //do nothing
        }

        return $field;
    }

    public function action_query($data) {

        if ($data['query_type'] == 'any') {
            $post_types = get_post_types(['public' => true], 'names');
            unset($post_types['attachment']);
            unset($post_types['dwp_pt']);
        } else {
            $post_types = $data['query_type'];
        }

        $args = [
            'numberposts' => -1,
            'post_type'   => $post_types,
            'post_status' => 'any',
            's' => $data['query_string'],
            'tax_query' => [
                [
                  'taxonomy' => 'dwp_dashboard',
                  'field' => 'name',
                  'terms' => [$data['query_term']]
                ]
            ]
        ];

        $results = get_posts($args);

        foreach ($results as $key => $result) {

            $dwp_pt = '';
            if (strpos($result->post_type, 'dwp_') !== 0) {
                $dwp_pt = 'dwp_pt_' . $result->post_type;
            } else {
                $dwp_pt = 'dwp_cpt_' . substr($result->post_type, 4);
            }

            $id = post_exists($dwp_pt, null, null, 'dwp_pt');

            $meta = get_post_meta($id, 'dwp_card_fields', true);
            self::$post_object = clone $result;
            $fields = array_map([__CLASS__, 'get_field_values'], $meta);
            
            $results[$key]->content_fields = $fields;
        }

        return $results;
    }

    public function get_field_values($field) {
        switch ($field['action']) {
            case 'dwp_title':
                $field['value'] = self::$post_object->post_title;
                break;
            case 'dwp_excerpt':
                $field['value'] = self::$post_object->post_excerpt;
                break;
            case 'meta':
                if (!empty($field['key'])) {
                    $meta = get_post_meta(self::$post_object->ID, $field['key'], true);
                    $field['value'] = $meta;
                }
                break;
            case 'eval':
                if (!empty($field['retrieve'])) {
                    $id = $post_args['ID'];
                    $value = eval($field['retrieve']);
                    if (!empty($value)) {
                        $field['value'] = '';
                    } else {
                        $field['value'] = $value;
                    }
                }
                break;
            default: 
                $field['value'] = '';
        }

        return $field;
    }

    public function action_delete($data) {
        $deleted = wp_delete_post($data['id'], true);
        return $deleted;

    }

}
