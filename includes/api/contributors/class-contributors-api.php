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
 * Functionality and actions specific to the contributors API
 */
class Contributors_API extends API {

	/**
	 * The route of the API
	 *
	 * @var string
	 */
    protected static $route = 'contributors';

    // API Actions 
    // denoted by 'action_' prefix followed by type

    public function action_create($data) {
        $dashboard = wp_insert_term($data['name'], 'dwp_contributor');
        return $dashboard;
    }

    public function action_query($data) {
        $dashboards = get_terms( [
            'taxonomy' => 'dwp_contributor',
            'hide_empty' => false,
        ]);
        return $dashboards;
    }

    public function action_delete($data) {
        $deleted = wp_delete_term($data['id'], 'dwp_contributor');
        return $deleted;
    }
	
}
