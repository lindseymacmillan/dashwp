<?php
/**
 * DashWP Screens manager.
 *
 * @package DashWP
 */

namespace DashWP;

defined( 'ABSPATH' ) || exit;

/**
 * Manages the settings.
 */
class APIs {

	/**
	 * Information about all of the APIs.
	 * See `init` for structure of the data.
	 *
	 * @var array
	 */
	public static $apis = [];

	/**
	 * Initialize and register all of the screens.
	 */
	public static function init() {
		static::$apis = [
			'content' => new Content_API(),
			'contributors' => new Contributors_API(),
			'dashboards' => new Dashboards_API(),
			'options' => new Options_API(),
			'post_types' => new Post_Types_API(),
			'quick_cards' => new Quick_Cards_API(),
		];

		add_action( 'rest_api_init', [__CLASS__, 'register_rest_routes'] );

	}

    /**
	 * Register all rest API routes
	 */
	public static function register_rest_routes() {
		foreach (static::$apis as $api) {
			$api->register_rest_route();
		}
    }

}
APIs::init();