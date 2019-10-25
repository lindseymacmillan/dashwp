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

    // API Actions 
    // denoted by 'action_' prefix followed by type

    public function action_create($data) {

        $tax_input = [];
        $tax_input['dwp_dashboard'] = $data['dashboard_name'];

        $args = [
            'post_type' => $data['post_type'],
            'tax_input' => $tax_input
        ];

        $fields = $data['fields'];
        foreach ($fields as $field) {
            if ($field['action'] === 'dwp_title') {
                $args['post_title'] = $field['value'];
            }

            if ($field['action'] === 'dwp_excerpt') {
                $args['post_excerpt'] = $field['value'];
            }
        }

        $post = wp_insert_post($args);
        return $post;
    }

	
}
