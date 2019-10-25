<?php
/**
 * DashWP Screens manager.
 *
 * @package DashWP
 */

namespace DashWP;

defined( 'ABSPATH' ) || exit;

/**
 * Manages the screens.
 */
class Screens {

	/**
	 * Information about all of the screens.
	 * See `init` for structure of the data.
	 *
	 * @var array
	 */
	protected static $screens = [];

	/**
	 * Initialize and register all of the screens.
	 */
	public static function init() {
		self::$screens = [
			'options'            => new Options_Screen(),
		];
		add_action( 'registered_taxonomy', [__CLASS__, 'generate_dashboards'] );

	}

	public static function generate_dashboards($taxonomy) {

		if ($taxonomy !== 'dwp_dashboard') {
			return;
		}

		$dashboards = get_terms( [
            'taxonomy' => 'dwp_dashboard',
            'hide_empty' => false,
		]);
		
		foreach($dashboards as $dashboard) {
        	self::$screens['dashboard-' . $dashboard->term_id ] = new Dashboard_Screen($dashboard->term_id, $dashboard->name, $dashboard->taxonomy);
		}
	}

	/**
	 * Get a screen's object.
	 *
	 * @param string $screen_slug The screen to get. Use slug from self::$screens.
	 * @return Screen | bool The screen on success, false on failure.
	 */
	public static function get_screen( $screen_slug ) {
		if ( isset( self::$screens[ $screen_slug ] ) ) {
			return self::$screens[ $screen_slug ];
		}

		return false;
	}

	/**
	 * Get a screen's URL.
	 *
	 * @param string $screen_slug The screen to get URL for. Use slug from self::$screens.
	 * @return string | bool The URL on success, false on failure.
	 */
	public static function get_url( $screen_slug ) {
		$screen = self::get_screen( $screen_slug );
		if ( $screen ) {
			return $screen->get_url();
		}

		return false;
	}

	/**
	 * Get all the URLs for all the screens.
	 *
	 * @return array of slug => URL pairs.
	 */
	public static function get_urls() {
		$urls = [];
		foreach ( self::$screens as $slug => $screen ) {
			$urls[ $slug ] = $screen->get_url();
		}

		return $urls;
	}

	/**
	 * Get a screen's name.
	 *
	 * @param string $screen_slug The screen to get name for. Use slug from self::$screens.
	 * @return string | bool The name on success, false on failure.
	 */
	public static function get_name( $screen_slug ) {
		$screen = self::get_screen( $screen_slug );
		if ( $screen ) {
			return $screen->get_name();
		}

		return false;
	}

	/**
	 * Get a screen's description.
	 *
	 * @param string $screen_slug The screen to get description for. Use slug from self::$screens.
	 * @return string | bool The description on success, false on failure.
	 */
	public static function get_description( $screen_slug ) {
		$screen = self::get_screen( $screen_slug );
		if ( $screen ) {
			return $screen->get_description();
		}

		return false;
	}
}
Screens::init();
