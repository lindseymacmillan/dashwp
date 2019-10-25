<?php
/**
 * DashWP setup
 *
 * @package DashWP
 */

namespace DashWP;

defined( 'ABSPATH' ) || exit;

/**
 * Main DashWP Class.
 */
final class DashWP {

	protected static $options = [];

	protected static $defaultOptions = ['testing'];

	/**
	 * The single instance of the class.
	 *
	 * @var DashWP
	 */
	protected static $_instance = null;

	/**
	 * Main DashWP Instance.
	 * Ensures only one instance of DashWP is loaded or can be loaded.
	 *
	 * @return DashWP - Main instance.
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	/**
	 * DashWP Constructor.
	 */
	public function __construct() {
		$this->define_constants();
		$this->includes();
		$this->init();
		add_action( 'admin_menu', [ $this, 'remove_all_dashwp_options' ], 1 );
	}

	/**
	 * Define DashWP Constants.
	 */
	private function define_constants() {
		define( 'DASHWP_VERSION', '0.0.1' );
		define( 'DASHWP_ABSPATH', dirname( DASHWP_PLUGIN_FILE ) . '/' );
	}

	/**
	 * Include required core files used in admin and on the frontend.
	 * e.g. include_once DASHWP_ABSPATH . 'includes/foo.php';
	 */
	private function includes() {

		//Include utility functions
		include_once DASHWP_ABSPATH . 'includes/util.php';

		//Include API classes
		include_once DASHWP_ABSPATH . 'includes/api/content/class-content-api.php';
		include_once DASHWP_ABSPATH . 'includes/api/contributors/class-contributors-api.php';
		include_once DASHWP_ABSPATH . 'includes/api/dashboards/class-dashboards-api.php';
		include_once DASHWP_ABSPATH . 'includes/api/options/class-options-api.php';
		include_once DASHWP_ABSPATH . 'includes/api/post-types/class-post-types-api.php';
		include_once DASHWP_ABSPATH . 'includes/api/quick-cards/class-quick-cards-api.php';

		//Register APIs
		include_once DASHWP_ABSPATH . 'includes/api/class-apis.php';
		
		//Include screen classes
		include_once DASHWP_ABSPATH . 'includes/screens/dashboard/class-dashboard-screen.php';
		include_once DASHWP_ABSPATH . 'includes/screens/options/class-options-screen.php';
		
		//Register screens
		include_once DASHWP_ABSPATH . 'includes/screens/class-screens.php';
	}

	/**
	 * Init DashWP options and configuration
	 *
	 * @return string URL
	 */
	public function init() {
		add_action( 'init', [$this, 'register_post_types'], 0 );
		add_action( 'init', [$this, 'register_dashboard_taxonomy']);
		add_action( 'init', [$this, 'register_contributor_taxonomy']);
		add_action( 'wp_loaded', [$this, 'manage_post_types'], 0 );

		add_filter( 'register_post_type_args', [$this, 'filter_post_type_args'], 20, 2);
	}

	public function register_dashboard_taxonomy() {

		$labels = array(
			'name'              => _x( 'Dashboards', 'taxonomy general name', 'textdomain' ),
			'singular_name'     => _x( 'Dashboard', 'taxonomy singular name', 'textdomain' ),
			'add_new_item'     => _x( 'Add to Dashboards', 'taxonomy singular name', 'textdomain' ),
		);
		$args = array(
			'hierarchical'      => false,
			'labels'            => $labels,
			'show_ui'           => true,
			'show_in_rest'		=> true,
			'show_admin_column' => true,
			'query_var'         => true,
			'rewrite'           => array( 'slug' => 'dashboard'),
		);

		register_taxonomy( 'dwp_dashboard', null, $args );

		$posts = get_posts([
			'post_type' => 'dwp_pt',
			'post_status' => 'publish'
		]);
		foreach($posts as $postType) {
			if (strpos($postType->post_title, 'dwp_cpt_') === 0) {
				$name = 'dwp_' . substr($postType->post_title, 8);
			} else if (strpos($postType->post_title, 'dwp_pt_') === 0) {
				$name = substr($postType->post_title, 7);
			}
			register_taxonomy_for_object_type( 'dwp_dashboard', $name );
		}
	}

	public function register_contributor_taxonomy() {

		$labels = array(
			'name'              => _x( 'Contributors', 'taxonomy general name', 'textdomain' ),
			'singular_name'     => _x( 'Contributor', 'taxonomy singular name', 'textdomain' ),
			'add_new_item'     => _x( 'Add Contributors', 'taxonomy singular name', 'textdomain' ),
		);
		$args = array(
			'hierarchical'      => false,
			'labels'            => $labels,
			'show_ui'           => true,
			'show_in_rest'		=> true,
			'show_admin_column' => true,
			'query_var'         => true,
			'rewrite'           => array( 'slug' => 'contributor'),
		);

		register_taxonomy( 'dwp_contributor', null, $args );

		$posts = get_posts([
			'post_type' => 'dwp_pt',
			'post_status' => 'publish'
		]);
		foreach($posts as $postType) {
			if (strpos($postType->post_title, 'dwp_cpt_') === 0) {
				$name = 'dwp_' . substr($postType->post_title, 8);
			} else if (strpos($postType->post_title, 'dwp_pt_') === 0) {
				$name = substr($postType->post_title, 7);
			}
			register_taxonomy_for_object_type( 'dwp_contributor', $name );
		}
	}

	public function register_post_types() {

		$this->register_custom_post_type([
			'name' => 'pt',
			'plural_name' => 'Post Types',
			'singular_name' => 'Post Type',
			'supports'		=> ['title'],
		]);

		$postTypes = get_posts([
			'post_type' => 'dwp_pt',
			'post_status' => 'publish'
		]);

		foreach($postTypes as $postType) {
			$name = $postType->post_title;
			if (strpos($name, 'dwp_cpt_') === 0) {
				$name = 'dwp_' . substr($name, 8);
				register_post_type($name);
			}
		}

	}

	public function filter_post_type_args($args, $post_type) {

		if (function_exists('post_exists') == false) {
			require_once ABSPATH . 'wp-admin/includes/post.php';
		}

		if (strpos($post_type, 'dwp_') === 0) {
			$name = 'dwp_cpt_' . substr($post_type, 4);
		} else {
			$name = 'dwp_pt_' . $post_type;
		}

		$id = post_exists($name, null, null, 'dwp_pt');

		if ($id === 0) {
			return $args;
		}

		$custom_args = get_post_meta($id, 'dwp_post_args', true);				

		$merged_args = array_merge($args, $custom_args);

		return $merged_args;
	}

	public function register_custom_post_type($pt) {
		$labels = array(
			'name'               => _x( $pt['plural_name'], 'post type general name', 'your-plugin-textdomain' ),
			'singular_name'      => _x( $pt['singular_name'], 'post type singular name', 'your-plugin-textdomain' ),
		);
	
		$args = array(
			'labels'             => $labels,
			'public'             => true,
			'show_in_nav_menus' => false,
			'publicly_queryable' => false,
			'show_in_rest'		 => false,
			'supports' 			 => $pt['supports'],
		);
	
		register_post_type( 'dwp_' . $pt['name'], $args );

	}

	public function manage_post_types() {

		if (function_exists('post_exists') == false) {
			require_once ABSPATH . 'wp-admin/includes/post.php';
		}

		$postTypes = get_post_types(['public' => true], 'objects');
		unset($postTypes['attachment']);
		$posts = get_posts([
			'post_type' => 'dwp_pt',
			'post_status' => 'publish'
		]);

		if ( count($postTypes) > count($posts) ) {
			foreach($postTypes as $postType) {
				if (strpos($postType->name, 'dwp_') !== 0) {
					$postExists = post_exists('dwp_pt_' . $postType->name, null, null, 'dwp_pt');
					if ($postExists === 0) {
						$postExists = wp_insert_post([
							'post_type' => 'dwp_pt',
							'post_title' => 'dwp_pt_' . $postType->name,
							'post_status' => 'publish'
						]);
						$labels = [
							'name' => $postType->labels->name,
							'singular_name' => $postType->labels->singular_name,
						];
						$args = [
							'labels' => $labels,
							'show_in_menu' => $postType->show_in_menu,
							'public' => true,
							'show_in_rest' => true,
							'show_ui' => true,
						];
						$meta_args = add_post_meta($postExists, 'dwp_post_args', $args);
						$fields = [
							[
								'type' => 'text',
								'label' => 'Title',
								'action' => 'dwp_title'
							],
							[
								'type' => 'textarea',
								'label' => 'Excerpt',
								'action' => 'dwp_excerpt'
							]
						];
						$meta_fields = add_post_meta($postExists, 'dwp_card_fields', $fields);
					}
				}
			}
		} else {
			echo 'too many posts!';
			foreach($posts as $post) {
				$isCustom = strpos($post->post_title, 'dwp_cpt_') === 0 ? true : false;
				$isSet = isset($postTypes[substr($post->post_title, 7)]) ? true : false;
				if ($isCustom === false && $isSet === false) {
					wp_delete_post($post->ID, true);
				}
			}
		}
	}

	/**
	 * Get the URL for the DashWP plugin directory.
	 *
	 * @return string URL
	 */
	public static function plugin_url() {
		return untrailingslashit( plugins_url( '/', DASHWP_PLUGIN_FILE ) );
	}

	/**
	 * Reset DashWP by removing all dashwp prefixed options. Triggered by the query param reset_dashwp_settings=1
	 */
	public function remove_all_dashwp_options() {
		if ( filter_input( INPUT_GET, 'reset_dashwp_settings', FILTER_SANITIZE_STRING ) === '1' ) {
			$all_options = wp_load_alloptions();
			foreach ( $all_options as $key => $value ) {
				if ( strpos( $key, 'dashwp' ) === 0 || strpos( $key, '_dashwp' ) === 0 ) {
					delete_option( $key );
				}
			}
		}
	}
}
DashWP::instance();
