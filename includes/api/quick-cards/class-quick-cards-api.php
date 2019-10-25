<?php
/**
 * DashWP Quick Cards API
 *
 * @package DashWP
 */

namespace DashWP;

defined( 'ABSPATH' ) || exit;

require_once DASHWP_ABSPATH . '/includes/api/class-api.php';

/**
 * Functionality and actions specific to the quick cards API
 */
class Quick_Cards_API extends API {

	/**
	 * The route of the API
	 *
	 * @var string
	 */
    protected static $route = 'quick_cards';

    // API Actions 
    // denoted by 'action_' prefix followed by type

    public function action_query($data) {
        $fields = [
            [
                'type' => 'text',
                'label' => 'Title',
                'value' => 'did it work?'
            ]
        ];

        return $fields;
    }

	
}
