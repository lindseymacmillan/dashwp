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
abstract class Screen {

	/**
	 * The slug of this screen. Override this.
	 *
	 * @var string
	 */
	protected $slug = '';

	/**
	 * The capability required to access this screen.
	 *
	 * @var string
	 */
	protected $capability = 'manage_options';

	/**
	 * Whether the screen should be displayed in the DashWP submenu.
	 *
	 * @var bool.
	 */
	protected $hidden = false;

	/**
	 * Priority setting for ordering admin submenu items.
	 *
	 * @var int.
	 */
	protected $menu_priority = 2;

	/**
	 * Initialize.
	 */
	public function __construct() {
		add_action( 'admin_menu', [ $this, 'add_page' ], $this->menu_priority );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts_and_styles' ] );
	}

	/**
	 * Add an admin page for the screen to live on.
	 */
	public function add_page() {
		add_submenu_page(
			$this->hidden ? null : 'options-general.php',
			$this->get_name(),
			$this->get_name(),
			$this->capability,
			$this->slug,
			[ $this, 'render_screen' ]
		);
	}

	/**
	 * Render the container for the screen.
	 */
	public function render_screen() {
		?>
		<div class="dashwp-screen <?php echo esc_attr( $this->slug ); ?>" id="root">
        </div>
		<?php
	}

	/**
	 * Load up common JS/CSS for screens.
	 */
	public function enqueue_scripts_and_styles() {
		if ( filter_input( INPUT_GET, 'page', FILTER_SANITIZE_STRING ) !== $this->slug ) {
			return;
		}

		// This script is just used for making dashwp data available in JS vars.
		// It should not actually load a JS file.
		wp_register_script( 'dashwp_data', '', [], '1.0', false );

		$urls = [
			'screens'    => Screens::get_urls(),
			'dashboard'  => Screens::get_url( 'dashboard' ),
		];

		wp_localize_script( 'dashwp_data', 'dashwp_urls', $urls );
		wp_enqueue_script( 'dashwp_data' );

	}

	/**
	 * Check capabilities for using API.
	 *
	 * @param WP_REST_Request $request API request object.
	 * @return bool|WP_Error
	 */
	public function api_permissions_check( $request ) {
		if ( ! current_user_can( $this->capability ) ) {
			return new \WP_Error(
				'dashwp_rest_forbidden',
				esc_html__( 'You cannot use this resource.', 'dashwp' ),
				[
					'status' => 403,
				]
			);
		}
		return true;
	}

	/**
	 * Check capabilities for using API when endpoint involves unfiltered HTML.
	 *
	 * @param WP_REST_Request $request API request object.
	 * @return bool|WP_Error
	 */
	public function api_permissions_check_unfiltered_html( $request ) {
		if ( ! current_user_can( 'unfiltered_html' ) ) {
			return new \WP_Error(
				'dashwp_rest_forbidden',
				esc_html__( 'You cannot use this resource.', 'dashwp' ),
				[
					'status' => 403,
				]
			);
		}
		return true;
	}

	/**
	 * Check whether a value is not empty.
	 * Intended for use as a `validate_callback` when registering API endpoints.
	 *
	 * @param mixed $value A param value.
	 * @return bool
	 */
	public function api_validate_not_empty( $value ) {
		if ( is_string( $value ) ) {
			$value = trim( $value );
		}

		return ! empty( $value );
	}

	/**
	 * Get the URL for this screen.
	 *
	 * @return string
	 */
	public function get_url() {
		return esc_url( admin_url( 'admin.php?page=' . $this->slug ) );
	}

	/**
	 * Get an array of Script dependencies
	 *
	 * @param array $dependencies Additional depedencies to add to the baseline ones.
	 * @return array An array of script dependencies.
	 */
	public function get_script_dependencies( $dependencies = [] ) {
		$base_dependencies = [ 'wp-components', 'wp-api-fetch', 'wp-element', 'wp-api'];
		return array_merge( $base_dependencies, $dependencies );
	}

	/**
	 * Get an array of Stylesheet dependencies.
	 *
	 * @param array $dependencies Additional depedencies to add to the baseline ones.
	 * @return array An array of script dependencies.
	 */
	public function get_style_dependencies( $dependencies = [] ) {
		$base_dependencies = [ 'wp-components'];
		return array_merge( $base_dependencies, $dependencies );
	}

	/**
	 * Get this screen's name.
	 *
	 * @return string The screen name.
	 */
    abstract public function get_name();

	/**
	 * Get the description of this wizard.
	 *
	 * @return string The wizard description.
	 */
	abstract public function get_description();

}
