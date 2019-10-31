<?php
/**
 * DashWP dashboard.
 *
 * @package DashWP
 */

namespace DashWP;

defined( 'ABSPATH' ) || exit;

require_once DASHWP_ABSPATH . '/includes/screens/class-screen.php';

/**
 * Common functionality for admin screens. Override this class.
 */
class Options_Screen extends Screen {

	/**
	 * The slug of this screen.
	 *
	 * @var string
	 */
	protected $slug = 'dwp_options';

	/**
	 * The capability required to access this.
	 *
	 * @var string
	 */
	protected $capability = 'manage_options';

	/**
	 * Priority setting for ordering admin submenu items. Dashboard must come first.
	 *
	 * @var int.
	 */
	protected $menu_priority = 1;

	/**
	 * Initialize.
	 */
	public function __construct() {
		add_action( 'admin_menu', [ $this, 'add_page' ], 1 );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts_and_styles' ] );
	}

	/**
	 * Get the name for this screen.
	 *
	 * @return string The screen name.
	 */
	public function get_name() {
		return esc_html__( 'Content', 'dashwp' );
	}

	/**
	 * Get the description of this screen.
	 *
	 * @return string The screen description.
	 */
	public function get_description() {
		return esc_html__( 'The DashWP Options page', 'dashwp' );
	}

	/**
	 * Load up JS/CSS.
	 */
	public function enqueue_scripts_and_styles() {
		parent::enqueue_scripts_and_styles();

		if ( filter_input( INPUT_GET, 'page', FILTER_SANITIZE_STRING ) !== $this->slug ) {
			return;
		}

		wp_register_script(
			'dwp-options',
			DashWP::plugin_url() . '/assets/dist/options.bundle.js',
			$this->get_script_dependencies(),
			filemtime( dirname( DASHWP_PLUGIN_FILE ) . '/assets/dist/options.bundle.js' ),
			true
		);
		//wp_localize_script( 'dashwp-dashboard', 'dashwp_dashboard', $this->get_dashboard() );
		wp_enqueue_script( 'dwp-options' );

		// This script is just used for making dashwp data available in JS vars.
		// It should not actually load a JS file.
		wp_register_script( 'dashwp_dashboard_data', '', [], '1.0', false );

		$data = [];

		$dashwpSettings = get_option( 'dashwp-settings', false );
		if ($dashwpSettings != false) {
			$data['settings'] = $dashwpSettings;
		}

		wp_localize_script( 'dashwp_data', 'dashwp_data', $data );
		wp_enqueue_script( 'dashwp_data' );

		wp_register_style(
			'dwp-styles',
			'',
			$this->get_style_dependencies(),
			''
		);
		wp_enqueue_style( 'dwp-styles' );

		wp_enqueue_media();

		wp_register_style(
			'roboto-font',
			'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
			null,
			''
		);
		wp_enqueue_style( 'roboto-font' );

		wp_register_style(
			'font-icons',
			'https://fonts.googleapis.com/icon?family=Material+Icons',
			null,
			''
		);
		wp_enqueue_style( 'font-icons' );
	}
}
