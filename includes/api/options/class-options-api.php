<?php
/**
 * DashWP Options API
 *
 * @package DashWP
 */

namespace DashWP;

defined( 'ABSPATH' ) || exit;

require_once DASHWP_ABSPATH . '/includes/api/class-api.php';

/**
 * Functionality and actions specific to the options API
 */
class Options_API extends API {

	/**
	 * The route of the API
	 *
	 * @var string
	 */
    protected static $route = 'options';

    // API Actions 
    // denoted by 'action_' prefix followed by type

    public function action_query($data) {
        return 'oof did it work?';
    }

	
}
