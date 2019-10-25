<?php
/**
 * Common functionality for admin screens.
 *
 * @package DashWP
 */

namespace DashWP;

defined( 'ABSPATH' ) || exit;

/**
 * Common functionality for admin screens. Override this class.
 */
abstract class API {

	/**
	 * The slug of this screen. Override this.
	 *
	 * @var string
	 */
    protected static $route = '';

	/**
	 * Initialize.
	 */
	public function __construct() {
        //Do nothing
    }

	public function register_rest_route () {
        register_rest_route( 'dashwp/v1', '/' . static::$route , [
            'methods' => \WP_REST_Server::EDITABLE,
            'callback' => [$this, 'handle_route'],
        ]);
    }

    public function handle_route (\WP_REST_Request $data) {

        $method = 'action_' . $data['action'];
        $method_exists = method_exists($this, $method);

        if ($method_exists === true) {
            $return = $this->$method($data['payload']);
        } else {
            $return = 'Action failed. Method could not be found.';
        }

        $response = [
            'action' => $data['action'],
            'payload' => $data['payload'],
            'return' => $return,
        ];

        return $response;
    }

}
