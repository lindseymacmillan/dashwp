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
class Dashboard_Screen extends Screen {

	/**
	 * The slug of this screen.
	 *
	 * @var string
	 */
	protected $slug = 'dashboard-';
	protected $id = '';
	protected $title = '';

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
	public function __construct($id, $title) {
		$this->slug = $this->slug . $id;
		$this->id = $id;
		$this->title = $title;


		add_action( 'admin_menu', [ $this, 'add_page' ], 1 );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts_and_styles' ] );
	}

	/**
	 * Get the name for this screen.
	 *
	 * @return string The screen name.
	 */
	public function get_name() {
		return esc_html__( $this->title, 'dashwp' );
	}

	/**
	 * Get the description of this screen.
	 *
	 * @return string The screen description.
	 */
	public function get_description() {
		return esc_html__( 'The DashWP hub', 'dashwp' );
	}

	/**
	 * Add an admin page for the screen to live on.
	 */
	public function add_page() {
		$icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjE4cHgiIGhlaWdodD0iNjE4cHgiIHZpZXdCb3g9IjAgMCA2MTggNjE4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTMwOSwwIEM0NzkuNjU2NDk1LDAgNjE4LDEzOC4zNDQyOTMgNjE4LDMwOS4wMDE3NTkgQzYxOCw0NzkuNjU5MjI2IDQ3OS42NTY0OTUsNjE4IDMwOSw2MTggQzEzOC4zNDM1MDUsNjE4IDAsNDc5LjY1OTIyNiAwLDMwOS4wMDE3NTkgQzAsMTM4LjM0NDI5MyAxMzguMzQzNTA1LDAgMzA5LDAgWiBNMTc0LDE3MSBMMTc0LDI2Mi42NzEzNTYgTDE3NS4zMDUsMjY0IEwxNzQsMjY0IEwxNzQsNDQ2IEwyNDEsNDQ2IEwyNDEsMzMwLjkxMyBMMzUzLjk5Mjk2Miw0NDYgTDQ0NCw0NDYgTDE3NCwxNzEgWiBNNDQ0LDI5OSBMMzg5LDI5OSBMNDEwLjQ3NzYxLDMyMSBMNDQ0LDMyMSBMNDQ0LDI5OSBaIE00NDQsMjM1IEwzMjcsMjM1IEwzNDguMjQ1OTE5LDI1NyBMNDQ0LDI1NyBMNDQ0LDIzNSBaIE00NDQsMTcxIEwyNjQsMTcxIEwyODUuMjkwNTEyLDE5MyBMNDQ0LDE5MyBMNDQ0LDE3MSBaIiBpZD0iQ29tYmluZWQtU2hhcGUiIGZpbGw9IiMyQTdERTEiPjwvcGF0aD4KICAgIDwvZz4KPC9zdmc+';
		add_menu_page(
			$this->get_name(),
			$this->get_name(),
			$this->capability,
			$this->slug,
			[ $this, 'render_screen' ],
			$icon,
			3
		);
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
			'dashwp-dashboard',
			DashWP::plugin_url() . '/assets/dist/dashboard.bundle.js',
			$this->get_script_dependencies(),
			filemtime( dirname( DASHWP_PLUGIN_FILE ) . '/assets/dist/dashboard.bundle.js' ),
			true
		);
		//wp_localize_script( 'dashwp-dashboard', 'dashwp_dashboard', $this->get_dashboard() );
		wp_enqueue_script( 'dashwp-dashboard' );

		// This script is just used for making dashwp data available in JS vars.
		// It should not actually load a JS file.
		wp_register_script( 'dwp_data', '', [], '1.0', false );

		$dashwpSettings = get_option( 'dashwp-settings', false );

		$data = [];

		$dashboards = APIs::$apis['dashboards']->action_query([]);
		foreach( $dashboards as $dashboard) {
			if ($dashboard['name'] === $this->title) {
				$data['name'] = $dashboard['name'];
				$data['id'] = $dashboard['id'];
				$data['description'] = $dashboard['description'];
				$data['linked_content'] = $dashboard['linked_content'];
				$data['supported_types'] = $dashboard['supported_types'];
				$data['supported_type_objects'] = $dashboard['supported_type_objects'];
				$data['filters'] = $dashboard['filters'];
				$data['views'] = $dashboard['views'];
			}
		}
		
		$post_types = APIs::$apis['post_types']->action_query([]);
		$data['post_types'] = $post_types;

		wp_localize_script( 'dwp_data', 'dwp_data', $data );
		wp_enqueue_script( 'dwp_data' );

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
