-- phpMyAdmin SQL Dump
-- version 4.4.7
-- http://www.phpmyadmin.net
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 26 jan 2020 kl 18:13
-- Serverversion: 5.7.18
-- PHP-version: 7.1.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Databas: `wizum`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `countries`
--

CREATE TABLE IF NOT EXISTS `countries` (
  `id` int(11) NOT NULL,
  `country_code` varchar(2) NOT NULL DEFAULT '',
  `country_name` varchar(100) NOT NULL DEFAULT ''
) ENGINE=MyISAM AUTO_INCREMENT=247 DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `countries`
--

INSERT INTO `countries` (`id`, `country_code`, `country_name`) VALUES
(1, 'AF', 'Afghanistan'),
(2, 'AL', 'Albania'),
(3, 'DZ', 'Algeria'),
(4, 'DS', 'American Samoa'),
(5, 'AD', 'Andorra'),
(6, 'AO', 'Angola'),
(7, 'AI', 'Anguilla'),
(8, 'AQ', 'Antarctica'),
(9, 'AG', 'Antigua and Barbuda'),
(10, 'AR', 'Argentina'),
(11, 'AM', 'Armenia'),
(12, 'AW', 'Aruba'),
(13, 'AU', 'Australia'),
(14, 'AT', 'Austria'),
(15, 'AZ', 'Azerbaijan'),
(16, 'BS', 'Bahamas'),
(17, 'BH', 'Bahrain'),
(18, 'BD', 'Bangladesh'),
(19, 'BB', 'Barbados'),
(20, 'BY', 'Belarus'),
(21, 'BE', 'Belgium'),
(22, 'BZ', 'Belize'),
(23, 'BJ', 'Benin'),
(24, 'BM', 'Bermuda'),
(25, 'BT', 'Bhutan'),
(26, 'BO', 'Bolivia'),
(27, 'BA', 'Bosnia and Herzegovina'),
(28, 'BW', 'Botswana'),
(29, 'BV', 'Bouvet Island'),
(30, 'BR', 'Brazil'),
(31, 'IO', 'British Indian Ocean Territory'),
(32, 'BN', 'Brunei Darussalam'),
(33, 'BG', 'Bulgaria'),
(34, 'BF', 'Burkina Faso'),
(35, 'BI', 'Burundi'),
(36, 'KH', 'Cambodia'),
(37, 'CM', 'Cameroon'),
(38, 'CA', 'Canada'),
(39, 'CV', 'Cape Verde'),
(40, 'KY', 'Cayman Islands'),
(41, 'CF', 'Central African Republic'),
(42, 'TD', 'Chad'),
(43, 'CL', 'Chile'),
(44, 'CN', 'China'),
(45, 'CX', 'Christmas Island'),
(46, 'CC', 'Cocos (Keeling) Islands'),
(47, 'CO', 'Colombia'),
(48, 'KM', 'Comoros'),
(49, 'CD', 'Democratic Republic of the Congo'),
(50, 'CG', 'Republic of Congo'),
(51, 'CK', 'Cook Islands'),
(52, 'CR', 'Costa Rica'),
(53, 'HR', 'Croatia (Hrvatska)'),
(54, 'CU', 'Cuba'),
(55, 'CY', 'Cyprus'),
(56, 'CZ', 'Czech Republic'),
(57, 'DK', 'Denmark'),
(58, 'DJ', 'Djibouti'),
(59, 'DM', 'Dominica'),
(60, 'DO', 'Dominican Republic'),
(61, 'TP', 'East Timor'),
(62, 'EC', 'Ecuador'),
(63, 'EG', 'Egypt'),
(64, 'SV', 'El Salvador'),
(65, 'GQ', 'Equatorial Guinea'),
(66, 'ER', 'Eritrea'),
(67, 'EE', 'Estonia'),
(68, 'ET', 'Ethiopia'),
(69, 'FK', 'Falkland Islands (Malvinas)'),
(70, 'FO', 'Faroe Islands'),
(71, 'FJ', 'Fiji'),
(72, 'FI', 'Finland'),
(73, 'FR', 'France'),
(74, 'FX', 'France, Metropolitan'),
(75, 'GF', 'French Guiana'),
(76, 'PF', 'French Polynesia'),
(77, 'TF', 'French Southern Territories'),
(78, 'GA', 'Gabon'),
(79, 'GM', 'Gambia'),
(80, 'GE', 'Georgia'),
(81, 'DE', 'Germany'),
(82, 'GH', 'Ghana'),
(83, 'GI', 'Gibraltar'),
(84, 'GK', 'Guernsey'),
(85, 'GR', 'Greece'),
(86, 'GL', 'Greenland'),
(87, 'GD', 'Grenada'),
(88, 'GP', 'Guadeloupe'),
(89, 'GU', 'Guam'),
(90, 'GT', 'Guatemala'),
(91, 'GN', 'Guinea'),
(92, 'GW', 'Guinea-Bissau'),
(93, 'GY', 'Guyana'),
(94, 'HT', 'Haiti'),
(95, 'HM', 'Heard and Mc Donald Islands'),
(96, 'HN', 'Honduras'),
(97, 'HK', 'Hong Kong'),
(98, 'HU', 'Hungary'),
(99, 'IS', 'Iceland'),
(100, 'IN', 'India'),
(101, 'IM', 'Isle of Man'),
(102, 'ID', 'Indonesia'),
(103, 'IR', 'Iran (Islamic Republic of)'),
(104, 'IQ', 'Iraq'),
(105, 'IE', 'Ireland'),
(106, 'IL', 'Israel'),
(107, 'IT', 'Italy'),
(108, 'CI', 'Ivory Coast'),
(109, 'JE', 'Jersey'),
(110, 'JM', 'Jamaica'),
(111, 'JP', 'Japan'),
(112, 'JO', 'Jordan'),
(113, 'KZ', 'Kazakhstan'),
(114, 'KE', 'Kenya'),
(115, 'KI', 'Kiribati'),
(116, 'KP', 'Korea, Democratic People''s Republic of'),
(117, 'KR', 'Korea, Republic of'),
(118, 'XK', 'Kosovo'),
(119, 'KW', 'Kuwait'),
(120, 'KG', 'Kyrgyzstan'),
(121, 'LA', 'Lao People''s Democratic Republic'),
(122, 'LV', 'Latvia'),
(123, 'LB', 'Lebanon'),
(124, 'LS', 'Lesotho'),
(125, 'LR', 'Liberia'),
(126, 'LY', 'Libyan Arab Jamahiriya'),
(127, 'LI', 'Liechtenstein'),
(128, 'LT', 'Lithuania'),
(129, 'LU', 'Luxembourg'),
(130, 'MO', 'Macau'),
(131, 'MK', 'North Macedonia'),
(132, 'MG', 'Madagascar'),
(133, 'MW', 'Malawi'),
(134, 'MY', 'Malaysia'),
(135, 'MV', 'Maldives'),
(136, 'ML', 'Mali'),
(137, 'MT', 'Malta'),
(138, 'MH', 'Marshall Islands'),
(139, 'MQ', 'Martinique'),
(140, 'MR', 'Mauritania'),
(141, 'MU', 'Mauritius'),
(142, 'TY', 'Mayotte'),
(143, 'MX', 'Mexico'),
(144, 'FM', 'Micronesia, Federated States of'),
(145, 'MD', 'Moldova, Republic of'),
(146, 'MC', 'Monaco'),
(147, 'MN', 'Mongolia'),
(148, 'ME', 'Montenegro'),
(149, 'MS', 'Montserrat'),
(150, 'MA', 'Morocco'),
(151, 'MZ', 'Mozambique'),
(152, 'MM', 'Myanmar'),
(153, 'NA', 'Namibia'),
(154, 'NR', 'Nauru'),
(155, 'NP', 'Nepal'),
(156, 'NL', 'Netherlands'),
(157, 'AN', 'Netherlands Antilles'),
(158, 'NC', 'New Caledonia'),
(159, 'NZ', 'New Zealand'),
(160, 'NI', 'Nicaragua'),
(161, 'NE', 'Niger'),
(162, 'NG', 'Nigeria'),
(163, 'NU', 'Niue'),
(164, 'NF', 'Norfolk Island'),
(165, 'MP', 'Northern Mariana Islands'),
(166, 'NO', 'Norway'),
(167, 'OM', 'Oman'),
(168, 'PK', 'Pakistan'),
(169, 'PW', 'Palau'),
(170, 'PS', 'Palestine'),
(171, 'PA', 'Panama'),
(172, 'PG', 'Papua New Guinea'),
(173, 'PY', 'Paraguay'),
(174, 'PE', 'Peru'),
(175, 'PH', 'Philippines'),
(176, 'PN', 'Pitcairn'),
(177, 'PL', 'Poland'),
(178, 'PT', 'Portugal'),
(179, 'PR', 'Puerto Rico'),
(180, 'QA', 'Qatar'),
(181, 'RE', 'Reunion'),
(182, 'RO', 'Romania'),
(183, 'RU', 'Russian Federation'),
(184, 'RW', 'Rwanda'),
(185, 'KN', 'Saint Kitts and Nevis'),
(186, 'LC', 'Saint Lucia'),
(187, 'VC', 'Saint Vincent and the Grenadines'),
(188, 'WS', 'Samoa'),
(189, 'SM', 'San Marino'),
(190, 'ST', 'Sao Tome and Principe'),
(191, 'SA', 'Saudi Arabia'),
(192, 'SN', 'Senegal'),
(193, 'RS', 'Serbia'),
(194, 'SC', 'Seychelles'),
(195, 'SL', 'Sierra Leone'),
(196, 'SG', 'Singapore'),
(197, 'SK', 'Slovakia'),
(198, 'SI', 'Slovenia'),
(199, 'SB', 'Solomon Islands'),
(200, 'SO', 'Somalia'),
(201, 'ZA', 'South Africa'),
(202, 'GS', 'South Georgia South Sandwich Islands'),
(203, 'SS', 'South Sudan'),
(204, 'ES', 'Spain'),
(205, 'LK', 'Sri Lanka'),
(206, 'SH', 'St. Helena'),
(207, 'PM', 'St. Pierre and Miquelon'),
(208, 'SD', 'Sudan'),
(209, 'SR', 'Suriname'),
(210, 'SJ', 'Svalbard and Jan Mayen Islands'),
(211, 'SZ', 'Swaziland'),
(212, 'SE', 'Sweden'),
(213, 'CH', 'Switzerland'),
(214, 'SY', 'Syrian Arab Republic'),
(215, 'TW', 'Taiwan'),
(216, 'TJ', 'Tajikistan'),
(217, 'TZ', 'Tanzania, United Republic of'),
(218, 'TH', 'Thailand'),
(219, 'TG', 'Togo'),
(220, 'TK', 'Tokelau'),
(221, 'TO', 'Tonga'),
(222, 'TT', 'Trinidad and Tobago'),
(223, 'TN', 'Tunisia'),
(224, 'TR', 'Turkey'),
(225, 'TM', 'Turkmenistan'),
(226, 'TC', 'Turks and Caicos Islands'),
(227, 'TV', 'Tuvalu'),
(228, 'UG', 'Uganda'),
(229, 'UA', 'Ukraine'),
(230, 'AE', 'United Arab Emirates'),
(231, 'GB', 'United Kingdom'),
(232, 'US', 'United States'),
(233, 'UM', 'United States minor outlying islands'),
(234, 'UY', 'Uruguay'),
(235, 'UZ', 'Uzbekistan'),
(236, 'VU', 'Vanuatu'),
(237, 'VA', 'Vatican City State'),
(238, 'VE', 'Venezuela'),
(239, 'VN', 'Vietnam'),
(240, 'VG', 'Virgin Islands (British)'),
(241, 'VI', 'Virgin Islands (U.S.)'),
(242, 'WF', 'Wallis and Futuna Islands'),
(243, 'EH', 'Western Sahara'),
(244, 'YE', 'Yemen'),
(245, 'ZM', 'Zambia'),
(246, 'ZW', 'Zimbabwe');

-- --------------------------------------------------------

--
-- Tabellstruktur `currencies`
--

CREATE TABLE IF NOT EXISTS `currencies` (
  `id` int(11) NOT NULL,
  `code` varchar(3) COLLATE utf8_unicode_ci NOT NULL,
  `symbol` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumpning av Data i tabell `currencies`
--

INSERT INTO `currencies` (`id`, `code`, `symbol`, `name`) VALUES
(1, 'SEK', 'kr', 'Swedish Krona'),
(2, 'USD', '$', 'US Dollar'),
(3, 'EUR', '€', 'Euro'),
(4, 'GBP', '£', 'British Pound');

-- --------------------------------------------------------

--
-- Tabellstruktur `customers`
--

CREATE TABLE IF NOT EXISTS `customers` (
  `id` bigint(20) NOT NULL,
  `name` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  `qr_code` varchar(128) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumpning av Data i tabell `customers`
--

INSERT INTO `customers` (`id`, `name`, `email`, `qr_code`) VALUES
(1, 'Glada Stinsen', '', 'IMNU-C001'),
(2, 'Chutney', '', 'IMNU-C002');

-- --------------------------------------------------------

--
-- Tabellstruktur `fm`
--

CREATE TABLE IF NOT EXISTS `fm` (
  `id` bigint(20) NOT NULL,
  `customer_id` bigint(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Food Menu';

--
-- Dumpning av Data i tabell `fm`
--

INSERT INTO `fm` (`id`, `customer_id`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Tabellstruktur `fm_categories`
--

CREATE TABLE IF NOT EXISTS `fm_categories` (
  `id` bigint(20) NOT NULL,
  `food_menu_id` bigint(20) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Internal Name (just for admins)',
  `weight` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Food Menu Item Categories';

--
-- Dumpning av Data i tabell `fm_categories`
--

INSERT INTO `fm_categories` (`id`, `food_menu_id`, `name`, `weight`) VALUES
(1, 1, '', 20),
(2, 1, '', 10),
(3, 1, '', 200),
(4, 2, 'A LA CARTE MENY', 0);

-- --------------------------------------------------------

--
-- Tabellstruktur `fm_category_lang`
--

CREATE TABLE IF NOT EXISTS `fm_category_lang` (
  `cat_id` bigint(20) NOT NULL COMMENT 'Food Menu Category ID',
  `language_id` int(11) NOT NULL,
  `name` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(1024) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumpning av Data i tabell `fm_category_lang`
--

INSERT INTO `fm_category_lang` (`cat_id`, `language_id`, `name`, `description`) VALUES
(1, 1, 'Varmrätter', 'Vägen till lycka går genom magen'),
(2, 1, 'Förrätter', 'Njut av våra härliga aptitretare'),
(3, 1, 'Efterrätter', 'Sjunk ner i stolen, knäpp upp bätet och njut av en konjak'),
(4, 1, 'A LA CARTE MENY', '');

-- --------------------------------------------------------

--
-- Tabellstruktur `fm_info_lang`
--

CREATE TABLE IF NOT EXISTS `fm_info_lang` (
  `food_menu_id` bigint(20) NOT NULL,
  `name` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(1024) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Food Menu Info Translations';

-- --------------------------------------------------------

--
-- Tabellstruktur `fm_items`
--

CREATE TABLE IF NOT EXISTS `fm_items` (
  `id` bigint(20) NOT NULL,
  `food_menu_id` bigint(20) NOT NULL,
  `item_cat_id` bigint(20) DEFAULT NULL,
  `item_ref_numer` varchar(64) COLLATE utf8_unicode_ci NOT NULL COMMENT 'The restaurants number for the dish (like A24)',
  `weight` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumpning av Data i tabell `fm_items`
--

INSERT INTO `fm_items` (`id`, `food_menu_id`, `item_cat_id`, `item_ref_numer`, `weight`) VALUES
(1, 1, 1, '', 0),
(2, 1, 1, '', 0),
(3, 1, 2, '', 0),
(4, 1, 1, '', 0),
(5, 1, 3, '', 0),
(6, 2, 4, '1', 0),
(7, 2, 4, '2', 0),
(16, 2, 4, '3', 0),
(17, 2, 4, '4', 0),
(18, 2, 4, '5', 0),
(19, 2, 4, '6', 0),
(20, 2, 4, '7', 0),
(21, 2, 4, '8', 0),
(22, 2, 4, '9', 0),
(23, 2, 4, '10', 0),
(24, 1, 2, 'A24', 0),
(25, 1, 2, 'A25', 0);

-- --------------------------------------------------------

--
-- Tabellstruktur `fm_item_lang`
--

CREATE TABLE IF NOT EXISTS `fm_item_lang` (
  `item_id` bigint(20) NOT NULL COMMENT 'Food Menu Item ID',
  `language_id` int(11) NOT NULL,
  `name` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(1024) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumpning av Data i tabell `fm_item_lang`
--

INSERT INTO `fm_item_lang` (`item_id`, `language_id`, `name`, `description`) VALUES
(1, 1, 'Toast Skagen med Citron', 'Fräscha räkor direkt ur ishavet serveras på en spröd toast med en skiva citron som pricker över i.'),
(2, 1, 'Löksoppa', 'Vår mustiga löksoppa gjord på närodlade råvaror'),
(3, 1, 'Currykyckling med Ris', 'Läckra strutsbröst med späckinlindad ankstjärt i hyvelspån slungad med sviskonpaj'),
(4, 1, 'Raffelstrutar', 'Fräsiga Raffelstrutar med chockladspån'),
(5, 1, 'Strutsbröst', 'Läckra strutsbröst med späckinlindad ankstjärt i hyvelspån slungad med sviskonpaj'),
(6, 1, 'HALLOUMI DELI TALLRIK', 'grillad halloumi,couscoussallad, hommus, tzatsiki dolmar, grillade grönsaker, salladsmix, vitlöksbröd'),
(6, 2, 'HALLOUMI DELI PLATE', '\r\ngrilled halloumi, couscous salad, hummus, tzatsiki dolmar, grilled vegetables, salad mix, garlic bread'),
(7, 1, 'VEGO BURGARE', 'sojaburgare, klyftpotatis, coleslaw, vitlökskräm, saltgurka, smokey ketchup, tomat, rödlök, vegansk cheddarost'),
(16, 1, 'HALLOUMI BURGARE', 'halloumi, klyftpotatis, vitlökscremé, gurka, tomat, rödlök, sallad, chutney´s burgar dressing'),
(17, 1, 'OUMPH BURGARE', 'pulled oumph, klyftpotatis, coleslaw, vitlökskräm, saltgurka, smokey ketchup, tomat, rödlök, vegansk cheddarost'),
(18, 1, 'CHEVRE KNYTE', 'chévreost, grillade grönsaker, polenta, rödbetschutney, salladsmix, balsamicodressing, sparris, grillad tomat, valnötter'),
(19, 1, 'PANERAD QUORN', 'quorn, klyftpotatis, avokado, grillade grönsaker, champinjoner, basilikadressing, vitlökskräm, salladsmix,sparris, rödvinssås'),
(20, 1, 'TZAYSPETT', 'marinerad sojakött, sötpotatisklyftor, vvitlökskräm, champinjoner, rödvinssås, grillade grönsaker, salladsmix, basilikadressing'),
(21, 1, 'GRILLMIX TALLRIK', 'tzayspett, tofuspett, chichispett, klyftpotatis, avokado, dragonkräm, sparris,, grillade grönsaker, salladsmix'),
(22, 1, 'TRE SORTERS TOFU', 'tomat-olivtofu, basilika-tofu, mandel-sesamtofu, vitlökskräm, klyftpotatis, avokado, hampafrö, grilade grönsaker, salladsmix, varm soltorkad tomatsås'),
(23, 1, 'PASTA CANNELONI', 'färsk pasta fylld med ricottaost och spenat, chutney´s tomatsås, basilika, grädde, mozzarella'),
(24, 1, 'Hallonslungad krabba', 'Gott från hav och skog'),
(25, 1, 'Rullar med bullar', 'Smarrig rätt från polen');

-- --------------------------------------------------------

--
-- Tabellstruktur `fm_item_price`
--

CREATE TABLE IF NOT EXISTS `fm_item_price` (
  `item_id` bigint(20) NOT NULL,
  `currency_id` int(11) NOT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumpning av Data i tabell `fm_item_price`
--

INSERT INTO `fm_item_price` (`item_id`, `currency_id`, `price`) VALUES
(1, 1, 78),
(1, 2, 6.5),
(2, 1, 165),
(2, 2, 17),
(3, 1, 130),
(3, 2, 13.5),
(4, 1, 129),
(4, 2, 13),
(5, 1, 256),
(5, 2, 26),
(24, 1, 100),
(25, 1, 120);

-- --------------------------------------------------------

--
-- Tabellstruktur `fm_item_props`
--

CREATE TABLE IF NOT EXISTS `fm_item_props` (
  `item_id` bigint(20) NOT NULL,
  `gluten` tinyint(1) DEFAULT '1',
  `lactose` tinyint(1) DEFAULT '1',
  `vegetarian` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Food Menu Item Properties';

--
-- Dumpning av Data i tabell `fm_item_props`
--

INSERT INTO `fm_item_props` (`item_id`, `gluten`, `lactose`, `vegetarian`) VALUES
(5, 0, 1, 1),
(24, 0, 0, 1),
(25, 0, 1, 1);

-- --------------------------------------------------------

--
-- Tabellstruktur `languages`
--

CREATE TABLE IF NOT EXISTS `languages` (
  `id` int(11) NOT NULL,
  `code` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumpning av Data i tabell `languages`
--

INSERT INTO `languages` (`id`, `code`, `name`) VALUES
(1, 'SE', 'Svenska'),
(2, 'EN', 'English');

-- --------------------------------------------------------

--
-- Tabellstruktur `markers`
--

CREATE TABLE IF NOT EXISTS `markers` (
  `id` int(11) NOT NULL,
  `name` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `lat` float(10,6) NOT NULL,
  `lng` float(10,6) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumpning av Data i tabell `markers`
--

INSERT INTO `markers` (`id`, `name`, `address`, `lat`, `lng`) VALUES
(1, 'Frankie Johnnie & Luigo Too', '939 W El Camino Real, Mountain View, CA', 37.386337, -122.085823),
(2, 'Amici''s East Coast Pizzeria', '790 Castro St, Mountain View, CA', 37.387138, -122.083237),
(3, 'Kapp''s Pizza Bar & Grill', '191 Castro St, Mountain View, CA', 37.393887, -122.078918),
(4, 'Round Table Pizza: Mountain View', '570 N Shoreline Blvd, Mountain View, CA', 37.402653, -122.079353),
(5, 'Tony & Alba''s Pizza & Pasta', '619 Escuela Ave, Mountain View, CA', 37.394012, -122.095528),
(6, 'Oregano''s Wood-Fired Pizza', '4546 El Camino Real, Los Altos, CA', 37.401726, -122.114647);

-- --------------------------------------------------------

--
-- Tabellstruktur `restaurants`
--

CREATE TABLE IF NOT EXISTS `restaurants` (
  `id` bigint(20) NOT NULL,
  `qr_code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  `website` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `logo` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `cover_image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `open_hours_id` bigint(20) DEFAULT NULL,
  `geo_location` point DEFAULT NULL,
  `branding` text COLLATE utf8_unicode_ci
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumpning av Data i tabell `restaurants`
--

INSERT INTO `restaurants` (`id`, `qr_code`, `name`, `description`, `website`, `logo`, `cover_image`, `open_hours_id`, `geo_location`, `branding`) VALUES
(2, 'IMNU8346', 'Glada Stinsen', 'Härligt hak', '', '', '', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Tabellstruktur `restaurant_location`
--

CREATE TABLE IF NOT EXISTS `restaurant_location` (
  `id` bigint(20) NOT NULL,
  `restaurant_id` bigint(20) NOT NULL,
  `country_code` varchar(4) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  `zip_code` varchar(128) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellstruktur `restaurant_open_hours`
--

CREATE TABLE IF NOT EXISTS `restaurant_open_hours` (
  `id` bigint(20) NOT NULL,
  `restaurant_id` bigint(20) NOT NULL,
  `day` tinyint(4) NOT NULL COMMENT 'ISO Numbering (sun = 0)',
  `open_at` time NOT NULL,
  `close_at` time NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumpning av Data i tabell `restaurant_open_hours`
--

INSERT INTO `restaurant_open_hours` (`id`, `restaurant_id`, `day`, `open_at`, `close_at`) VALUES
(8, 2, 0, '06:00:00', '10:00:00');

-- --------------------------------------------------------

--
-- Tabellstruktur `translations`
--

CREATE TABLE IF NOT EXISTS `translations` (
  `id` bigint(20) NOT NULL,
  `language_id` int(11) NOT NULL,
  `lang_key` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `translation` varchar(1024) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `country_code` (`country_code`);

--
-- Index för tabell `currencies`
--
ALTER TABLE `currencies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index för tabell `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `fm`
--
ALTER TABLE `fm`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Index för tabell `fm_categories`
--
ALTER TABLE `fm_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `food_menu_id` (`food_menu_id`);

--
-- Index för tabell `fm_category_lang`
--
ALTER TABLE `fm_category_lang`
  ADD UNIQUE KEY `cat_id` (`cat_id`),
  ADD KEY `item_id` (`cat_id`),
  ADD KEY `language_id` (`language_id`),
  ADD KEY `language_id_2` (`language_id`);

--
-- Index för tabell `fm_info_lang`
--
ALTER TABLE `fm_info_lang`
  ADD UNIQUE KEY `food_menu_id_2` (`food_menu_id`),
  ADD KEY `food_menu_id` (`food_menu_id`);

--
-- Index för tabell `fm_items`
--
ALTER TABLE `fm_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `food_menu_id` (`food_menu_id`),
  ADD KEY `item_cat_id` (`item_cat_id`);

--
-- Index för tabell `fm_item_lang`
--
ALTER TABLE `fm_item_lang`
  ADD UNIQUE KEY `idx_unique_iid_lid` (`item_id`,`language_id`),
  ADD KEY `item_id` (`item_id`),
  ADD KEY `language_id` (`language_id`);

--
-- Index för tabell `fm_item_price`
--
ALTER TABLE `fm_item_price`
  ADD UNIQUE KEY `idx_unique_row` (`item_id`,`currency_id`),
  ADD KEY `currency_id` (`currency_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Index för tabell `fm_item_props`
--
ALTER TABLE `fm_item_props`
  ADD UNIQUE KEY `item_id_2` (`item_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Index för tabell `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `markers`
--
ALTER TABLE `markers`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `open_hours_id` (`open_hours_id`);

--
-- Index för tabell `restaurant_location`
--
ALTER TABLE `restaurant_location`
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Index för tabell `restaurant_open_hours`
--
ALTER TABLE `restaurant_open_hours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Index för tabell `translations`
--
ALTER TABLE `translations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `language_id` (`language_id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=247;
--
-- AUTO_INCREMENT för tabell `currencies`
--
ALTER TABLE `currencies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT för tabell `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT för tabell `fm`
--
ALTER TABLE `fm`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT för tabell `fm_categories`
--
ALTER TABLE `fm_categories`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT för tabell `fm_items`
--
ALTER TABLE `fm_items`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT för tabell `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT för tabell `markers`
--
ALTER TABLE `markers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT för tabell `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT för tabell `restaurant_open_hours`
--
ALTER TABLE `restaurant_open_hours`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT för tabell `translations`
--
ALTER TABLE `translations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `fm`
--
ALTER TABLE `fm`
  ADD CONSTRAINT `idx_cust_id` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restriktioner för tabell `fm_categories`
--
ALTER TABLE `fm_categories`
  ADD CONSTRAINT `idx_fmic_food_menu_id` FOREIGN KEY (`food_menu_id`) REFERENCES `fm` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restriktioner för tabell `fm_category_lang`
--
ALTER TABLE `fm_category_lang`
  ADD CONSTRAINT `idx_cat_id` FOREIGN KEY (`cat_id`) REFERENCES `fm_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idx_cat_lang_id` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restriktioner för tabell `fm_items`
--
ALTER TABLE `fm_items`
  ADD CONSTRAINT `idx_food_menu_id` FOREIGN KEY (`food_menu_id`) REFERENCES `fm` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idx_item_cat_id` FOREIGN KEY (`item_cat_id`) REFERENCES `fm_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Restriktioner för tabell `fm_item_lang`
--
ALTER TABLE `fm_item_lang`
  ADD CONSTRAINT `idx_fmi_id` FOREIGN KEY (`item_id`) REFERENCES `fm_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idx_language_id` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restriktioner för tabell `fm_item_price`
--
ALTER TABLE `fm_item_price`
  ADD CONSTRAINT `idx_currency_id` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idx_item_id` FOREIGN KEY (`item_id`) REFERENCES `fm_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restriktioner för tabell `restaurants`
--
ALTER TABLE `restaurants`
  ADD CONSTRAINT `idx_open_hours` FOREIGN KEY (`open_hours_id`) REFERENCES `restaurant_open_hours` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Restriktioner för tabell `restaurant_location`
--
ALTER TABLE `restaurant_location`
  ADD CONSTRAINT `idx_rest_id` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restriktioner för tabell `restaurant_open_hours`
--
ALTER TABLE `restaurant_open_hours`
  ADD CONSTRAINT `idx_restaurant_id` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restriktioner för tabell `translations`
--
ALTER TABLE `translations`
  ADD CONSTRAINT `idx_lang_id` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
