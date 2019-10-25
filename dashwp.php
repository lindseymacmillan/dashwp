<?php
/**
 * Plugin Name: DashWP
 * Description: An advanced boilerplate for building React-enabled Wordpress plugins.
 * Version: 1.0.0
 * Author: Henry holtgeerts
 * Author URI: https://henryholtgeerts.com
 * License: GPL2
 * Text Domain: dashwp
 * Domain Path: /languages/
 */

defined( 'ABSPATH' ) || exit;

// Define DASHWP_PLUGIN_FILE.
if ( ! defined( 'DASHWP_PLUGIN_FILE' ) ) {
	define( 'DASHWP_PLUGIN_FILE', __FILE__ );
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-dashwp-activator.php
 */
function activate_dashwp() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-dashwp-activator.php';
	DashWP_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-dashwp-deactivator.php
 */
function deactivate_dashwp() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-dashwp-deactivator.php';
	DashWP_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_dashwp' );
register_deactivation_hook( __FILE__, 'deactivate_dashwp' );

// Include the main DashWP class.
if ( ! class_exists( 'DashWP' ) ) {
	include_once dirname( __FILE__ ) . '/includes/class-dashwp.php';
}
