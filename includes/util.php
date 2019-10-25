<?php
/**
 * Useful functions.
 *
 * @package DashWP
 */

namespace DashWP;

defined( 'ABSPATH' ) || exit;

function acf_get_fields_in_group( $group_id ) {
    $acf_meta = get_post_custom( $group_id );
    $acf_fields = array();

    foreach ( $acf_meta as $key => $val ) {
        if ( preg_match( "/^field_/", $key ) ) {
            $acf_fields[$key] = $val;
        }
    }

    return $acf_fields;
}

/**
 * Clean variables using sanitize_text_field. Arrays are cleaned recursively.
 * Non-scalar values are ignored.
 *
 * @param string|array $var Data to sanitize.
 * @return string|array
 */
function dashwp_clean( $var ) {
	if ( is_array( $var ) ) {
		return array_map( 'dashwp_clean', $var );
	} else {
		return is_scalar( $var ) ? sanitize_text_field( $var ) : $var;
	}
}

/**
 * Converts a string (e.g. 'yes' or 'no') to a bool.
 *
 * @param string $string String to convert.
 * @return bool
 */
function dashwp_string_to_bool( $string ) {
	return is_bool( $string ) ? $string : ( 'yes' === $string || 1 === $string || 'true' === $string || '1' === $string );
}

/**
 * Activate the DashWP theme (installing it if necessary).
 *
 * @return bool | WP_Error True on success. WP_Error on failure.
 */
function dashwp_install_activate_theme() {
	$theme_slug = 'dashwp-theme';
	$theme_url  = 'https://github.com/Automattic/dashwp-theme/releases/latest/download/dashwp-theme.zip';

	$theme_object = wp_get_theme( $theme_slug );
	if ( ! $theme_object->exists() ) {
		require_once ABSPATH . 'wp-admin/includes/file.php';
		include_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
		include_once ABSPATH . 'wp-admin/includes/theme.php';
		WP_Filesystem();

		$skin     = new \Automatic_Upgrader_Skin();
		$upgrader = new \Theme_Upgrader( $skin );
		$success  = $upgrader->install( $theme_url );

		if ( is_wp_error( $success ) ) {
			return $success;
		} else if ( $success ) {
			// Make sure `-master` or `-1.0.1` etc. are not in the theme folder name.
			// We just want the folder name to be the theme slug.
			$theme_object    = $upgrader->theme_info();
			$theme_folder    = $theme_object->get_template_directory();
			$expected_folder = $theme_object->get_theme_root() . '/' . $theme_slug;
			if ( $theme_folder !== $expected_folder ) {
				rename( $theme_folder, $expected_folder );
			}
		} else {
			return new \WP_Error(
				'dashwp_theme_failed_install',
				__( 'DashWP theme installation failed.', 'dashwp' )
			);
		}
	}

	switch_theme( $theme_slug );
	return true;
}

/**
 * Get full list of currency codes. Copied from https://github.com/woocommerce/woocommerce/blob/master/includes/wc-core-functions.php
 *
 * @return array
 */
function dashwp_currencies() {
	$currencies = array(
		'AED' => __( 'United Arab Emirates dirham', 'dashwp' ),
		'AFN' => __( 'Afghan afghani', 'dashwp' ),
		'ALL' => __( 'Albanian lek', 'dashwp' ),
		'AMD' => __( 'Armenian dram', 'dashwp' ),
		'ANG' => __( 'Netherlands Antillean guilder', 'dashwp' ),
		'AOA' => __( 'Angolan kwanza', 'dashwp' ),
		'ARS' => __( 'Argentine peso', 'dashwp' ),
		'AUD' => __( 'Australian dollar', 'dashwp' ),
		'AWG' => __( 'Aruban florin', 'dashwp' ),
		'AZN' => __( 'Azerbaijani manat', 'dashwp' ),
		'BAM' => __( 'Bosnia and Herzegovina convertible mark', 'dashwp' ),
		'BBD' => __( 'Barbadian dollar', 'dashwp' ),
		'BDT' => __( 'Bangladeshi taka', 'dashwp' ),
		'BGN' => __( 'Bulgarian lev', 'dashwp' ),
		'BHD' => __( 'Bahraini dinar', 'dashwp' ),
		'BIF' => __( 'Burundian franc', 'dashwp' ),
		'BMD' => __( 'Bermudian dollar', 'dashwp' ),
		'BND' => __( 'Brunei dollar', 'dashwp' ),
		'BOB' => __( 'Bolivian boliviano', 'dashwp' ),
		'BRL' => __( 'Brazilian real', 'dashwp' ),
		'BSD' => __( 'Bahamian dollar', 'dashwp' ),
		'BTC' => __( 'Bitcoin', 'dashwp' ),
		'BTN' => __( 'Bhutanese ngultrum', 'dashwp' ),
		'BWP' => __( 'Botswana pula', 'dashwp' ),
		'BYR' => __( 'Belarusian ruble (old)', 'dashwp' ),
		'BYN' => __( 'Belarusian ruble', 'dashwp' ),
		'BZD' => __( 'Belize dollar', 'dashwp' ),
		'CAD' => __( 'Canadian dollar', 'dashwp' ),
		'CDF' => __( 'Congolese franc', 'dashwp' ),
		'CHF' => __( 'Swiss franc', 'dashwp' ),
		'CLP' => __( 'Chilean peso', 'dashwp' ),
		'CNY' => __( 'Chinese yuan', 'dashwp' ),
		'COP' => __( 'Colombian peso', 'dashwp' ),
		'CRC' => __( 'Costa Rican col&oacute;n', 'dashwp' ),
		'CUC' => __( 'Cuban convertible peso', 'dashwp' ),
		'CUP' => __( 'Cuban peso', 'dashwp' ),
		'CVE' => __( 'Cape Verdean escudo', 'dashwp' ),
		'CZK' => __( 'Czech koruna', 'dashwp' ),
		'DJF' => __( 'Djiboutian franc', 'dashwp' ),
		'DKK' => __( 'Danish krone', 'dashwp' ),
		'DOP' => __( 'Dominican peso', 'dashwp' ),
		'DZD' => __( 'Algerian dinar', 'dashwp' ),
		'EGP' => __( 'Egyptian pound', 'dashwp' ),
		'ERN' => __( 'Eritrean nakfa', 'dashwp' ),
		'ETB' => __( 'Ethiopian birr', 'dashwp' ),
		'EUR' => __( 'Euro', 'dashwp' ),
		'FJD' => __( 'Fijian dollar', 'dashwp' ),
		'FKP' => __( 'Falkland Islands pound', 'dashwp' ),
		'GBP' => __( 'Pound sterling', 'dashwp' ),
		'GEL' => __( 'Georgian lari', 'dashwp' ),
		'GGP' => __( 'Guernsey pound', 'dashwp' ),
		'GHS' => __( 'Ghana cedi', 'dashwp' ),
		'GIP' => __( 'Gibraltar pound', 'dashwp' ),
		'GMD' => __( 'Gambian dalasi', 'dashwp' ),
		'GNF' => __( 'Guinean franc', 'dashwp' ),
		'GTQ' => __( 'Guatemalan quetzal', 'dashwp' ),
		'GYD' => __( 'Guyanese dollar', 'dashwp' ),
		'HKD' => __( 'Hong Kong dollar', 'dashwp' ),
		'HNL' => __( 'Honduran lempira', 'dashwp' ),
		'HRK' => __( 'Croatian kuna', 'dashwp' ),
		'HTG' => __( 'Haitian gourde', 'dashwp' ),
		'HUF' => __( 'Hungarian forint', 'dashwp' ),
		'IDR' => __( 'Indonesian rupiah', 'dashwp' ),
		'ILS' => __( 'Israeli new shekel', 'dashwp' ),
		'IMP' => __( 'Manx pound', 'dashwp' ),
		'INR' => __( 'Indian rupee', 'dashwp' ),
		'IQD' => __( 'Iraqi dinar', 'dashwp' ),
		'IRR' => __( 'Iranian rial', 'dashwp' ),
		'IRT' => __( 'Iranian toman', 'dashwp' ),
		'ISK' => __( 'Icelandic kr&oacute;na', 'dashwp' ),
		'JEP' => __( 'Jersey pound', 'dashwp' ),
		'JMD' => __( 'Jamaican dollar', 'dashwp' ),
		'JOD' => __( 'Jordanian dinar', 'dashwp' ),
		'JPY' => __( 'Japanese yen', 'dashwp' ),
		'KES' => __( 'Kenyan shilling', 'dashwp' ),
		'KGS' => __( 'Kyrgyzstani som', 'dashwp' ),
		'KHR' => __( 'Cambodian riel', 'dashwp' ),
		'KMF' => __( 'Comorian franc', 'dashwp' ),
		'KPW' => __( 'North Korean won', 'dashwp' ),
		'KRW' => __( 'South Korean won', 'dashwp' ),
		'KWD' => __( 'Kuwaiti dinar', 'dashwp' ),
		'KYD' => __( 'Cayman Islands dollar', 'dashwp' ),
		'KZT' => __( 'Kazakhstani tenge', 'dashwp' ),
		'LAK' => __( 'Lao kip', 'dashwp' ),
		'LBP' => __( 'Lebanese pound', 'dashwp' ),
		'LKR' => __( 'Sri Lankan rupee', 'dashwp' ),
		'LRD' => __( 'Liberian dollar', 'dashwp' ),
		'LSL' => __( 'Lesotho loti', 'dashwp' ),
		'LYD' => __( 'Libyan dinar', 'dashwp' ),
		'MAD' => __( 'Moroccan dirham', 'dashwp' ),
		'MDL' => __( 'Moldovan leu', 'dashwp' ),
		'MGA' => __( 'Malagasy ariary', 'dashwp' ),
		'MKD' => __( 'Macedonian denar', 'dashwp' ),
		'MMK' => __( 'Burmese kyat', 'dashwp' ),
		'MNT' => __( 'Mongolian t&ouml;gr&ouml;g', 'dashwp' ),
		'MOP' => __( 'Macanese pataca', 'dashwp' ),
		'MRO' => __( 'Mauritanian ouguiya', 'dashwp' ),
		'MUR' => __( 'Mauritian rupee', 'dashwp' ),
		'MVR' => __( 'Maldivian rufiyaa', 'dashwp' ),
		'MWK' => __( 'Malawian kwacha', 'dashwp' ),
		'MXN' => __( 'Mexican peso', 'dashwp' ),
		'MYR' => __( 'Malaysian ringgit', 'dashwp' ),
		'MZN' => __( 'Mozambican metical', 'dashwp' ),
		'NAD' => __( 'Namibian dollar', 'dashwp' ),
		'NGN' => __( 'Nigerian naira', 'dashwp' ),
		'NIO' => __( 'Nicaraguan c&oacute;rdoba', 'dashwp' ),
		'NOK' => __( 'Norwegian krone', 'dashwp' ),
		'NPR' => __( 'Nepalese rupee', 'dashwp' ),
		'NZD' => __( 'New Zealand dollar', 'dashwp' ),
		'OMR' => __( 'Omani rial', 'dashwp' ),
		'PAB' => __( 'Panamanian balboa', 'dashwp' ),
		'PEN' => __( 'Sol', 'dashwp' ),
		'PGK' => __( 'Papua New Guinean kina', 'dashwp' ),
		'PHP' => __( 'Philippine peso', 'dashwp' ),
		'PKR' => __( 'Pakistani rupee', 'dashwp' ),
		'PLN' => __( 'Polish z&#x142;oty', 'dashwp' ),
		'PRB' => __( 'Transnistrian ruble', 'dashwp' ),
		'PYG' => __( 'Paraguayan guaran&iacute;', 'dashwp' ),
		'QAR' => __( 'Qatari riyal', 'dashwp' ),
		'RON' => __( 'Romanian leu', 'dashwp' ),
		'RSD' => __( 'Serbian dinar', 'dashwp' ),
		'RUB' => __( 'Russian ruble', 'dashwp' ),
		'RWF' => __( 'Rwandan franc', 'dashwp' ),
		'SAR' => __( 'Saudi riyal', 'dashwp' ),
		'SBD' => __( 'Solomon Islands dollar', 'dashwp' ),
		'SCR' => __( 'Seychellois rupee', 'dashwp' ),
		'SDG' => __( 'Sudanese pound', 'dashwp' ),
		'SEK' => __( 'Swedish krona', 'dashwp' ),
		'SGD' => __( 'Singapore dollar', 'dashwp' ),
		'SHP' => __( 'Saint Helena pound', 'dashwp' ),
		'SLL' => __( 'Sierra Leonean leone', 'dashwp' ),
		'SOS' => __( 'Somali shilling', 'dashwp' ),
		'SRD' => __( 'Surinamese dollar', 'dashwp' ),
		'SSP' => __( 'South Sudanese pound', 'dashwp' ),
		'STD' => __( 'S&atilde;o Tom&eacute; and Pr&iacute;ncipe dobra', 'dashwp' ),
		'SYP' => __( 'Syrian pound', 'dashwp' ),
		'SZL' => __( 'Swazi lilangeni', 'dashwp' ),
		'THB' => __( 'Thai baht', 'dashwp' ),
		'TJS' => __( 'Tajikistani somoni', 'dashwp' ),
		'TMT' => __( 'Turkmenistan manat', 'dashwp' ),
		'TND' => __( 'Tunisian dinar', 'dashwp' ),
		'TOP' => __( 'Tongan pa&#x2bb;anga', 'dashwp' ),
		'TRY' => __( 'Turkish lira', 'dashwp' ),
		'TTD' => __( 'Trinidad and Tobago dollar', 'dashwp' ),
		'TWD' => __( 'New Taiwan dollar', 'dashwp' ),
		'TZS' => __( 'Tanzanian shilling', 'dashwp' ),
		'UAH' => __( 'Ukrainian hryvnia', 'dashwp' ),
		'UGX' => __( 'Ugandan shilling', 'dashwp' ),
		'USD' => __( 'United States (US) dollar', 'dashwp' ),
		'UYU' => __( 'Uruguayan peso', 'dashwp' ),
		'UZS' => __( 'Uzbekistani som', 'dashwp' ),
		'VEF' => __( 'Venezuelan bol&iacute;var', 'dashwp' ),
		'VES' => __( 'Bol&iacute;var soberano', 'dashwp' ),
		'VND' => __( 'Vietnamese &#x111;&#x1ed3;ng', 'dashwp' ),
		'VUV' => __( 'Vanuatu vatu', 'dashwp' ),
		'WST' => __( 'Samoan t&#x101;l&#x101;', 'dashwp' ),
		'XAF' => __( 'Central African CFA franc', 'dashwp' ),
		'XCD' => __( 'East Caribbean dollar', 'dashwp' ),
		'XOF' => __( 'West African CFA franc', 'dashwp' ),
		'XPF' => __( 'CFP franc', 'dashwp' ),
		'YER' => __( 'Yemeni rial', 'dashwp' ),
		'ZAR' => __( 'South African rand', 'dashwp' ),
		'ZMW' => __( 'Zambian kwacha', 'dashwp' ),
	);
	return $currencies;
}

/**
 * Get full list of country codes. Copied from https://github.com/woocommerce/woocommerce/blob/master/includes/class-wc-countries.php
 *
 * @return array
 */
function dashwp_countries() {
	$countries = array(
		'AF' => __( 'Afghanistan', 'dashwp' ),
		'AX' => __( '&#197;land Islands', 'dashwp' ),
		'AL' => __( 'Albania', 'dashwp' ),
		'DZ' => __( 'Algeria', 'dashwp' ),
		'AS' => __( 'American Samoa', 'dashwp' ),
		'AD' => __( 'Andorra', 'dashwp' ),
		'AO' => __( 'Angola', 'dashwp' ),
		'AI' => __( 'Anguilla', 'dashwp' ),
		'AQ' => __( 'Antarctica', 'dashwp' ),
		'AG' => __( 'Antigua and Barbuda', 'dashwp' ),
		'AR' => __( 'Argentina', 'dashwp' ),
		'AM' => __( 'Armenia', 'dashwp' ),
		'AW' => __( 'Aruba', 'dashwp' ),
		'AU' => __( 'Australia', 'dashwp' ),
		'AT' => __( 'Austria', 'dashwp' ),
		'AZ' => __( 'Azerbaijan', 'dashwp' ),
		'BS' => __( 'Bahamas', 'dashwp' ),
		'BH' => __( 'Bahrain', 'dashwp' ),
		'BD' => __( 'Bangladesh', 'dashwp' ),
		'BB' => __( 'Barbados', 'dashwp' ),
		'BY' => __( 'Belarus', 'dashwp' ),
		'BE' => __( 'Belgium', 'dashwp' ),
		'PW' => __( 'Belau', 'dashwp' ),
		'BZ' => __( 'Belize', 'dashwp' ),
		'BJ' => __( 'Benin', 'dashwp' ),
		'BM' => __( 'Bermuda', 'dashwp' ),
		'BT' => __( 'Bhutan', 'dashwp' ),
		'BO' => __( 'Bolivia', 'dashwp' ),
		'BQ' => __( 'Bonaire, Saint Eustatius and Saba', 'dashwp' ),
		'BA' => __( 'Bosnia and Herzegovina', 'dashwp' ),
		'BW' => __( 'Botswana', 'dashwp' ),
		'BV' => __( 'Bouvet Island', 'dashwp' ),
		'BR' => __( 'Brazil', 'dashwp' ),
		'IO' => __( 'British Indian Ocean Territory', 'dashwp' ),
		'BN' => __( 'Brunei', 'dashwp' ),
		'BG' => __( 'Bulgaria', 'dashwp' ),
		'BF' => __( 'Burkina Faso', 'dashwp' ),
		'BI' => __( 'Burundi', 'dashwp' ),
		'KH' => __( 'Cambodia', 'dashwp' ),
		'CM' => __( 'Cameroon', 'dashwp' ),
		'CA' => __( 'Canada', 'dashwp' ),
		'CV' => __( 'Cape Verde', 'dashwp' ),
		'KY' => __( 'Cayman Islands', 'dashwp' ),
		'CF' => __( 'Central African Republic', 'dashwp' ),
		'TD' => __( 'Chad', 'dashwp' ),
		'CL' => __( 'Chile', 'dashwp' ),
		'CN' => __( 'China', 'dashwp' ),
		'CX' => __( 'Christmas Island', 'dashwp' ),
		'CC' => __( 'Cocos (Keeling) Islands', 'dashwp' ),
		'CO' => __( 'Colombia', 'dashwp' ),
		'KM' => __( 'Comoros', 'dashwp' ),
		'CG' => __( 'Congo (Brazzaville)', 'dashwp' ),
		'CD' => __( 'Congo (Kinshasa)', 'dashwp' ),
		'CK' => __( 'Cook Islands', 'dashwp' ),
		'CR' => __( 'Costa Rica', 'dashwp' ),
		'HR' => __( 'Croatia', 'dashwp' ),
		'CU' => __( 'Cuba', 'dashwp' ),
		'CW' => __( 'Cura&ccedil;ao', 'dashwp' ),
		'CY' => __( 'Cyprus', 'dashwp' ),
		'CZ' => __( 'Czech Republic', 'dashwp' ),
		'DK' => __( 'Denmark', 'dashwp' ),
		'DJ' => __( 'Djibouti', 'dashwp' ),
		'DM' => __( 'Dominica', 'dashwp' ),
		'DO' => __( 'Dominican Republic', 'dashwp' ),
		'EC' => __( 'Ecuador', 'dashwp' ),
		'EG' => __( 'Egypt', 'dashwp' ),
		'SV' => __( 'El Salvador', 'dashwp' ),
		'GQ' => __( 'Equatorial Guinea', 'dashwp' ),
		'ER' => __( 'Eritrea', 'dashwp' ),
		'EE' => __( 'Estonia', 'dashwp' ),
		'ET' => __( 'Ethiopia', 'dashwp' ),
		'FK' => __( 'Falkland Islands', 'dashwp' ),
		'FO' => __( 'Faroe Islands', 'dashwp' ),
		'FJ' => __( 'Fiji', 'dashwp' ),
		'FI' => __( 'Finland', 'dashwp' ),
		'FR' => __( 'France', 'dashwp' ),
		'GF' => __( 'French Guiana', 'dashwp' ),
		'PF' => __( 'French Polynesia', 'dashwp' ),
		'TF' => __( 'French Southern Territories', 'dashwp' ),
		'GA' => __( 'Gabon', 'dashwp' ),
		'GM' => __( 'Gambia', 'dashwp' ),
		'GE' => __( 'Georgia', 'dashwp' ),
		'DE' => __( 'Germany', 'dashwp' ),
		'GH' => __( 'Ghana', 'dashwp' ),
		'GI' => __( 'Gibraltar', 'dashwp' ),
		'GR' => __( 'Greece', 'dashwp' ),
		'GL' => __( 'Greenland', 'dashwp' ),
		'GD' => __( 'Grenada', 'dashwp' ),
		'GP' => __( 'Guadeloupe', 'dashwp' ),
		'GU' => __( 'Guam', 'dashwp' ),
		'GT' => __( 'Guatemala', 'dashwp' ),
		'GG' => __( 'Guernsey', 'dashwp' ),
		'GN' => __( 'Guinea', 'dashwp' ),
		'GW' => __( 'Guinea-Bissau', 'dashwp' ),
		'GY' => __( 'Guyana', 'dashwp' ),
		'HT' => __( 'Haiti', 'dashwp' ),
		'HM' => __( 'Heard Island and McDonald Islands', 'dashwp' ),
		'HN' => __( 'Honduras', 'dashwp' ),
		'HK' => __( 'Hong Kong', 'dashwp' ),
		'HU' => __( 'Hungary', 'dashwp' ),
		'IS' => __( 'Iceland', 'dashwp' ),
		'IN' => __( 'India', 'dashwp' ),
		'ID' => __( 'Indonesia', 'dashwp' ),
		'IR' => __( 'Iran', 'dashwp' ),
		'IQ' => __( 'Iraq', 'dashwp' ),
		'IE' => __( 'Ireland', 'dashwp' ),
		'IM' => __( 'Isle of Man', 'dashwp' ),
		'IL' => __( 'Israel', 'dashwp' ),
		'IT' => __( 'Italy', 'dashwp' ),
		'CI' => __( 'Ivory Coast', 'dashwp' ),
		'JM' => __( 'Jamaica', 'dashwp' ),
		'JP' => __( 'Japan', 'dashwp' ),
		'JE' => __( 'Jersey', 'dashwp' ),
		'JO' => __( 'Jordan', 'dashwp' ),
		'KZ' => __( 'Kazakhstan', 'dashwp' ),
		'KE' => __( 'Kenya', 'dashwp' ),
		'KI' => __( 'Kiribati', 'dashwp' ),
		'KW' => __( 'Kuwait', 'dashwp' ),
		'KG' => __( 'Kyrgyzstan', 'dashwp' ),
		'LA' => __( 'Laos', 'dashwp' ),
		'LV' => __( 'Latvia', 'dashwp' ),
		'LB' => __( 'Lebanon', 'dashwp' ),
		'LS' => __( 'Lesotho', 'dashwp' ),
		'LR' => __( 'Liberia', 'dashwp' ),
		'LY' => __( 'Libya', 'dashwp' ),
		'LI' => __( 'Liechtenstein', 'dashwp' ),
		'LT' => __( 'Lithuania', 'dashwp' ),
		'LU' => __( 'Luxembourg', 'dashwp' ),
		'MO' => __( 'Macao S.A.R., China', 'dashwp' ),
		'MK' => __( 'North Macedonia', 'dashwp' ),
		'MG' => __( 'Madagascar', 'dashwp' ),
		'MW' => __( 'Malawi', 'dashwp' ),
		'MY' => __( 'Malaysia', 'dashwp' ),
		'MV' => __( 'Maldives', 'dashwp' ),
		'ML' => __( 'Mali', 'dashwp' ),
		'MT' => __( 'Malta', 'dashwp' ),
		'MH' => __( 'Marshall Islands', 'dashwp' ),
		'MQ' => __( 'Martinique', 'dashwp' ),
		'MR' => __( 'Mauritania', 'dashwp' ),
		'MU' => __( 'Mauritius', 'dashwp' ),
		'YT' => __( 'Mayotte', 'dashwp' ),
		'MX' => __( 'Mexico', 'dashwp' ),
		'FM' => __( 'Micronesia', 'dashwp' ),
		'MD' => __( 'Moldova', 'dashwp' ),
		'MC' => __( 'Monaco', 'dashwp' ),
		'MN' => __( 'Mongolia', 'dashwp' ),
		'ME' => __( 'Montenegro', 'dashwp' ),
		'MS' => __( 'Montserrat', 'dashwp' ),
		'MA' => __( 'Morocco', 'dashwp' ),
		'MZ' => __( 'Mozambique', 'dashwp' ),
		'MM' => __( 'Myanmar', 'dashwp' ),
		'NA' => __( 'Namibia', 'dashwp' ),
		'NR' => __( 'Nauru', 'dashwp' ),
		'NP' => __( 'Nepal', 'dashwp' ),
		'NL' => __( 'Netherlands', 'dashwp' ),
		'NC' => __( 'New Caledonia', 'dashwp' ),
		'NZ' => __( 'New Zealand', 'dashwp' ),
		'NI' => __( 'Nicaragua', 'dashwp' ),
		'NE' => __( 'Niger', 'dashwp' ),
		'NG' => __( 'Nigeria', 'dashwp' ),
		'NU' => __( 'Niue', 'dashwp' ),
		'NF' => __( 'Norfolk Island', 'dashwp' ),
		'MP' => __( 'Northern Mariana Islands', 'dashwp' ),
		'KP' => __( 'North Korea', 'dashwp' ),
		'NO' => __( 'Norway', 'dashwp' ),
		'OM' => __( 'Oman', 'dashwp' ),
		'PK' => __( 'Pakistan', 'dashwp' ),
		'PS' => __( 'Palestinian Territory', 'dashwp' ),
		'PA' => __( 'Panama', 'dashwp' ),
		'PG' => __( 'Papua New Guinea', 'dashwp' ),
		'PY' => __( 'Paraguay', 'dashwp' ),
		'PE' => __( 'Peru', 'dashwp' ),
		'PH' => __( 'Philippines', 'dashwp' ),
		'PN' => __( 'Pitcairn', 'dashwp' ),
		'PL' => __( 'Poland', 'dashwp' ),
		'PT' => __( 'Portugal', 'dashwp' ),
		'PR' => __( 'Puerto Rico', 'dashwp' ),
		'QA' => __( 'Qatar', 'dashwp' ),
		'RE' => __( 'Reunion', 'dashwp' ),
		'RO' => __( 'Romania', 'dashwp' ),
		'RU' => __( 'Russia', 'dashwp' ),
		'RW' => __( 'Rwanda', 'dashwp' ),
		'BL' => __( 'Saint Barth&eacute;lemy', 'dashwp' ),
		'SH' => __( 'Saint Helena', 'dashwp' ),
		'KN' => __( 'Saint Kitts and Nevis', 'dashwp' ),
		'LC' => __( 'Saint Lucia', 'dashwp' ),
		'MF' => __( 'Saint Martin (French part)', 'dashwp' ),
		'SX' => __( 'Saint Martin (Dutch part)', 'dashwp' ),
		'PM' => __( 'Saint Pierre and Miquelon', 'dashwp' ),
		'VC' => __( 'Saint Vincent and the Grenadines', 'dashwp' ),
		'SM' => __( 'San Marino', 'dashwp' ),
		'ST' => __( 'S&atilde;o Tom&eacute; and Pr&iacute;ncipe', 'dashwp' ),
		'SA' => __( 'Saudi Arabia', 'dashwp' ),
		'SN' => __( 'Senegal', 'dashwp' ),
		'RS' => __( 'Serbia', 'dashwp' ),
		'SC' => __( 'Seychelles', 'dashwp' ),
		'SL' => __( 'Sierra Leone', 'dashwp' ),
		'SG' => __( 'Singapore', 'dashwp' ),
		'SK' => __( 'Slovakia', 'dashwp' ),
		'SI' => __( 'Slovenia', 'dashwp' ),
		'SB' => __( 'Solomon Islands', 'dashwp' ),
		'SO' => __( 'Somalia', 'dashwp' ),
		'ZA' => __( 'South Africa', 'dashwp' ),
		'GS' => __( 'South Georgia/Sandwich Islands', 'dashwp' ),
		'KR' => __( 'South Korea', 'dashwp' ),
		'SS' => __( 'South Sudan', 'dashwp' ),
		'ES' => __( 'Spain', 'dashwp' ),
		'LK' => __( 'Sri Lanka', 'dashwp' ),
		'SD' => __( 'Sudan', 'dashwp' ),
		'SR' => __( 'Suriname', 'dashwp' ),
		'SJ' => __( 'Svalbard and Jan Mayen', 'dashwp' ),
		'SZ' => __( 'Swaziland', 'dashwp' ),
		'SE' => __( 'Sweden', 'dashwp' ),
		'CH' => __( 'Switzerland', 'dashwp' ),
		'SY' => __( 'Syria', 'dashwp' ),
		'TW' => __( 'Taiwan', 'dashwp' ),
		'TJ' => __( 'Tajikistan', 'dashwp' ),
		'TZ' => __( 'Tanzania', 'dashwp' ),
		'TH' => __( 'Thailand', 'dashwp' ),
		'TL' => __( 'Timor-Leste', 'dashwp' ),
		'TG' => __( 'Togo', 'dashwp' ),
		'TK' => __( 'Tokelau', 'dashwp' ),
		'TO' => __( 'Tonga', 'dashwp' ),
		'TT' => __( 'Trinidad and Tobago', 'dashwp' ),
		'TN' => __( 'Tunisia', 'dashwp' ),
		'TR' => __( 'Turkey', 'dashwp' ),
		'TM' => __( 'Turkmenistan', 'dashwp' ),
		'TC' => __( 'Turks and Caicos Islands', 'dashwp' ),
		'TV' => __( 'Tuvalu', 'dashwp' ),
		'UG' => __( 'Uganda', 'dashwp' ),
		'UA' => __( 'Ukraine', 'dashwp' ),
		'AE' => __( 'United Arab Emirates', 'dashwp' ),
		'GB' => __( 'United Kingdom (UK)', 'dashwp' ),
		'US' => __( 'United States (US)', 'dashwp' ),
		'UM' => __( 'United States (US) Minor Outlying Islands', 'dashwp' ),
		'UY' => __( 'Uruguay', 'dashwp' ),
		'UZ' => __( 'Uzbekistan', 'dashwp' ),
		'VU' => __( 'Vanuatu', 'dashwp' ),
		'VA' => __( 'Vatican', 'dashwp' ),
		'VE' => __( 'Venezuela', 'dashwp' ),
		'VN' => __( 'Vietnam', 'dashwp' ),
		'VG' => __( 'Virgin Islands (British)', 'dashwp' ),
		'VI' => __( 'Virgin Islands (US)', 'dashwp' ),
		'WF' => __( 'Wallis and Futuna', 'dashwp' ),
		'EH' => __( 'Western Sahara', 'dashwp' ),
		'WS' => __( 'Samoa', 'dashwp' ),
		'YE' => __( 'Yemen', 'dashwp' ),
		'ZM' => __( 'Zambia', 'dashwp' ),
		'ZW' => __( 'Zimbabwe', 'dashwp' ),
	);
	return $countries;
}

/**
 * Convert an associative array into array of objects prepped for selectControl.
 *
 * @param array $arr Array to be converted.
 * @return array
 */
function dashwp_select_prepare( $arr ) {
	$result = array();
	foreach ( $arr as $key => $value ) {
		$result[] = [
			'label' => html_entity_decode( $value ),
			'value' => $key,
		];
	}
	return $result;
}
