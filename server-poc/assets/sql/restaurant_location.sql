-- phpMyAdmin SQL Dump
-- version 4.4.7
-- http://www.phpmyadmin.net
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 26 jan 2020 kl 15:29
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
-- Tabellstruktur `restaurant_location`
--

CREATE TABLE IF NOT EXISTS `restaurant_location` (
  `id` bigint(20) NOT NULL,
  `restaurant_id` bigint(20) NOT NULL,
  `country_code` varchar(4) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  `zip_code` varchar(128) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `restaurant_location`
--
ALTER TABLE `restaurant_location`
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `restaurant_location`
--
ALTER TABLE `restaurant_location`
  ADD CONSTRAINT `idx_rest_id` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
