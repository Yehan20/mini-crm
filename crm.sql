-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2025 at 01:15 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crm`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('crm-backend-cache-d189a3df25facd3522214377f5876bcb', 'i:1;', 1757613093),
('crm-backend-cache-d189a3df25facd3522214377f5876bcb:timer', 'i:1757613093;', 1757613093),
('crm-backend-cache-f1f70ec40aaa556905d4a030501c0ba4', 'i:10;', 1757675379),
('crm-backend-cache-f1f70ec40aaa556905d4a030501c0ba4:timer', 'i:1757675379;', 1757675379);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `website` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL COMMENT 'file path to logo',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `name`, `email`, `website`, `logo`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Cruickshank-Barrows', 'cale.okeefe@marvin.com', 'https://www.sanford.com', 'https://placehold.co/100', '2025-09-11 14:49:47', '2025-09-11 04:48:26', '2025-09-11 14:49:47'),
(2, 'Miller-Daugherty', 'dwisoky@pacocha.com', 'https://www.abshire.biz', 'https://placehold.co/100', '2025-09-11 14:50:44', '2025-09-11 04:48:26', '2025-09-11 14:50:44'),
(3, 'Kassulke-Koelpin', 'aida.nicolas@bogan.org', 'https://www.langosh.net', 'https://placehold.co/100', '2025-09-11 14:50:49', '2025-09-11 04:48:26', '2025-09-11 14:50:49'),
(4, 'Braun, Streich and Oberbrunner', 'orodriguez@christiansen.com', 'https://www.simonis.net', 'https://placehold.co/100', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(5, 'Abshire-Sauer', 'grady.damon@bauch.com', 'https://www.bins.com', 'https://placehold.co/100', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(6, 'Cummings Group', 'cormier.jillian@adams.com', 'https://www.adams.com', 'https://placehold.co/100', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(7, 'Schaefer-Hane', 'ihyatt@abbott.com', 'https://www.keebler.biz', 'https://placehold.co/100', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(8, 'Will-DuBuque', 'lucy.williamson@luettgen.biz', 'https://www.king.net', 'https://placehold.co/100', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(9, 'Kerluke Inc', 'nrolfson@keebler.com', 'https://www.ankunding.biz', 'https://placehold.co/100', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(10, 'Effertz, Terry and Larkin', 'lucile.jacobson@bartoletti.com', 'https://www.hessel.com', 'https://placehold.co/100', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(11, 'O\'Conner-Boyle', 'huel.deondre@lockman.com', 'https://www.ortiz.com', 'https://placehold.co/100', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(12, 'Towne LLC', 'tweissnat@hauck.com', 'https://www.spencer.com', 'https://placehold.co/100', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(13, 'Huel, Kuphal and Dickens', 'soledad47@robel.com', 'https://www.hartmann.com', 'https://placehold.co/100', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(14, 'McLaughlin-Kuvalis', 'kiehn.vergie@quitzon.com', 'https://www.bradtke.com', 'https://placehold.co/100', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(15, 'Kulas Ltd', 'carmelo.feil@nicolas.com', 'https://www.miller.com', 'https://placehold.co/100', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(16, 'Daugherty Inc', 'emcclure@nikolaus.com', 'https://www.yost.com', 'https://placehold.co/100', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(17, 'Klocko, Sporer and Weissnat', 'aditya.lesch@hodkiewicz.com', 'https://www.mayert.com', 'https://placehold.co/100', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(18, 'Keeling LLC', 'emilie.boyle@harber.com', 'https://www.orn.com', 'https://placehold.co/100', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(19, 'Hermann Group', 'norberto34@runte.net', 'https://www.dach.net', 'https://placehold.co/100', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(20, 'Erdman, Erdman and Zieme', 'kacie73@haley.com', 'https://www.larkin.com', 'https://placehold.co/100', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(21, 'aslan', 'koshila@test.com', 'aaaaaa', 'logos/4vH85BLaXcVnr61Y3xQAvA20yyDhtsSe0TR0jL6q.jpg', '2025-09-11 23:20:18', '2025-09-11 13:23:58', '2025-09-11 23:20:18'),
(22, 'abc', 'gawokak@mailinator.com', 'https://www.kugiworizud.ws', 'logos/h51hQAxQJ1hvQjW7ZSBnWIVKfCtOqm3iDw7VmvF6.jpg', '2025-09-11 15:37:47', '2025-09-11 13:25:01', '2025-09-11 15:37:47'),
(23, 'abc1', 'gawokak1@mailinator.com', 'https://www.kugiworizud.ws', 'logos/ZsqkUcXPyEvDW8tqnMNdwrANDIYO5nmsm3l8F1C7.jpg', '2025-09-11 14:44:57', '2025-09-11 13:25:47', '2025-09-11 14:44:57'),
(24, 'Holcomb', 'pypemos@mailinator.com', 'https://www.nozom.biz', 'logos/hAg2OknR7DxReyhgQTCidV92DiKQFeDCDFwJlMEU.jpg', '2025-09-11 14:44:52', '2025-09-11 13:27:19', '2025-09-11 14:44:52'),
(25, 'My Company', 'paolo11.kuphal3@example.org', 'https://www.baumbach', 'logos/4yHLDuJjoAgprhuSpwcEGxsN1aNpTCOjbKB3uomt.jpg', '2025-09-11 22:52:39', '2025-09-11 18:48:14', '2025-09-11 22:52:39'),
(26, 'Miranda Griffin Co', 'jojuwita@mailinator.com', 'https://www.syhujiq.ws', 'logos/GSISgXKn4YsFpnfy315JZLs8xVbSvlIQHwfbhDmz.jpg', NULL, '2025-09-12 01:39:10', '2025-09-12 01:39:10'),
(27, 'Pittman Luna Trading', 'dudino@mailinator.com', 'https://www.hytihytiteg.net', 'logos/OoR1LgQzzcxOBtDoRVtQPi0b5YFjlNvdTvlVHrtL.jpg', '2025-09-12 04:11:01', '2025-09-12 01:39:42', '2025-09-12 04:11:01'),
(28, 'Perry Hooper 1rading', 'cotow@mailinator.com', 'https://www.wuvodav.ws', 'logos/jD4GwsNXr3rEy9RDxPSulKQQ5qX0fe9oGhiNq2EE.jpg', NULL, '2025-09-12 02:58:39', '2025-09-12 03:13:30'),
(29, 'Rasmussen and Whitehead Co', 'wyfujujab@mailinator.com', 'https://www.reda.ws', 'logos/nIoXmGfFMpIIOPDOwBpqxTyEXpJDTIRXHnqo38S8.jpg', NULL, '2025-09-12 04:32:53', '2025-09-12 04:32:53'),
(30, 'Dennis Dorsey Plc', 'qyfagep@mailinator.com', 'https://www.jaj.ca', 'logos/2dL2FG8LifuwjWfqs1NGwVRzOlGfsucX38FxGTOv.jpg', '2025-09-12 05:33:28', '2025-09-12 04:33:19', '2025-09-12 05:33:28'),
(31, 'Harper and Horn Plc', 'wicexem@mailinator.com', 'https://www.rulocoraf.us', 'logos/HYQKH2yNZcf2oo1LgO9y91vpI99cxmiKt7VhcdNe.jpg', '2025-09-12 05:24:49', '2025-09-12 05:24:41', '2025-09-12 05:24:49'),
(32, 'sassss', 'qyfage1p@mailinator.com', '1111', 'logos/Po1oNk2tg45Hg7bHvTQ7z5bmvGtEECggGl4nly9z.jpg', '2025-09-12 05:33:23', '2025-09-12 05:33:04', '2025-09-12 05:33:23');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `company_id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `first_name`, `last_name`, `company_id`, `email`, `phone`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Hyman', 'Casper', 11, 'krohan@example.com', '1-877-512-3820', '2025-09-11 23:43:01', '2025-09-11 04:48:26', '2025-09-11 23:43:01'),
(2, 'Weston', 'Hyatt', 11, 'hane.carey@example.com', '(844) 750-9331', '2025-09-11 23:45:12', '2025-09-11 04:48:26', '2025-09-11 23:45:12'),
(3, 'Brennon11111', 'Durgan11', 10, 'hailey09@example.com', '0712358379', NULL, '2025-09-11 04:48:26', '2025-09-11 23:48:26'),
(4, 'Chloe', 'Reinger', 10, 'ara.casper@example.net', '1-877-387-7894', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(5, 'Lenna', 'Mills', 17, 'jharvey@example.org', '877-318-2313', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(6, 'Kenyatta', 'Wiza', 8, 'treutel.mortimer@example.com', '800-980-0720', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(7, 'Terrill', 'Graham', 14, 'schimmel.micah@example.org', '800-802-3190', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(8, 'Maryam', 'Effertz', 7, 'pietro.roob@example.net', '844.302.9380', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(9, 'Braulio', 'Haag', 20, 'madie.gibson@example.com', '1-800-400-0044', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(10, 'Rosalyn', 'Hackett', 7, 'danyka.gerlach@example.net', '(866) 332-3828', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(11, 'Sadye', 'Kulas', 14, 'ulices58@example.net', '(800) 557-7191', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(12, 'Matilde', 'Rosenbaum', 15, 'angelica.adams@example.net', '(866) 265-5366', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(13, 'Trever', 'Douglas', 8, 'qschowalter@example.net', '1-877-817-0572', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(14, 'Loraine', 'Metz', 5, 'mills.haley@example.org', '(877) 544-6717', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(15, 'Laurel', 'Bayer', 16, 'raquel50@example.com', '877.462.6388', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(16, 'Glennie', 'O\'Conner', 11, 'qharris@example.com', '(800) 313-4280', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(17, 'Jerrold', 'Brekke', 20, 'mziemann@example.com', '844.442.9328', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(18, 'Sterling', 'Fahey', 17, 'tom93@example.org', '866-632-4897', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(19, 'Isom', 'Cassin', 5, 'areichel@example.net', '800.345.2043', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(21, 'Nathen', 'Hermiston', 6, 'kirlin.sophie@example.com', '1-844-741-0952', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(22, 'Edwina', 'Hills', 13, 'marks.jacey@example.net', '888-836-2444', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(23, 'Berneice', 'Osinski', 6, 'ismith@example.net', '1-844-417-7548', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(24, 'Modesta', 'Kohler', 18, 'mboehm@example.org', '1-844-477-0007', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(26, 'Sherman', 'Daugherty', 11, 'sgorczany@example.com', '1-800-220-0870', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(27, 'Gina', 'Mante', 9, 'kerluke.arden@example.net', '844-817-1354', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(28, 'Kirsten', 'Cummerata', 5, 'omckenzie@example.net', '844-904-2862', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(29, 'Jamir', 'Zboncak', 6, 'cade.kiehn@example.net', '888-618-3921', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(31, 'Lavinia', 'Walter', 16, 'schaefer.carol@example.net', '888.840.6879', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(33, 'Timmy', 'Parker', 15, 'mwill@example.com', '1-844-595-4633', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(34, 'Krystel', 'Thompson', 8, 'ila.herzog@example.net', '1-800-916-2076', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(35, 'Aleen', 'Hand', 16, 'lavada.cartwright@example.org', '800.700.0662', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(36, 'Anjali', 'Schulist', 18, 'ihuels@example.org', '844-979-1180', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(38, 'Rebeca', 'Hahn', 19, 'morissette.jace@example.org', '1-800-452-6757', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(39, 'Terence', 'Bins', 20, 'ehagenes@example.net', '844.328.1097', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(42, 'Luna', 'Miller', 9, 'morissette.myrtle@example.com', '(800) 970-6108', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(43, 'Conner', 'Muller', 12, 'martin.kling@example.com', '(866) 397-7757', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(44, 'Alan', 'Jones', 9, 'swyman@example.net', '888-376-2650', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(45, 'Ulices', 'Schimmel', 5, 'anthony.kohler@example.com', '1-855-947-8655', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(47, 'Carley', 'Hoeger', 6, 'jayson.osinski@example.net', '(855) 289-2819', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(48, 'Hortense', 'Ruecker', 20, 'carmen.wintheiser@example.net', '844.272.0131', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(50, 'Brandon', 'Schroeder', 19, 'brandon25@example.com', '855.466.1179', NULL, '2025-09-11 04:48:26', '2025-09-11 04:48:26'),
(51, 'aaa', 'aaa', 8, 'jylahulul@mailinator.com', '0712358379', '2025-09-11 23:42:54', '2025-09-11 21:05:49', '2025-09-11 23:42:54'),
(52, 'Hayes', 'Cook', 6, 'luqugaz@mailinator.com', '0712358379', NULL, '2025-09-12 00:17:03', '2025-09-12 00:17:03'),
(53, 'Alexandra', 'Carey', 16, 'lusinofux@mailinator.com', '0712358379', NULL, '2025-09-12 01:17:12', '2025-09-12 01:17:12'),
(54, 'Maia', 'Williamson', 20, 'hohabecib@mailinator.com', '0712358379', '2025-09-12 04:10:33', '2025-09-12 01:18:29', '2025-09-12 04:10:33'),
(55, 'Solomon', 'William', 7, 'pazozo@mailinator.com', '+1 (874) 399-3', NULL, '2025-09-12 05:16:09', '2025-09-12 05:16:09'),
(56, 'Doris111111111', 'Byers', 28, 'qage@mailinator.com', '+1 (165) 802-', '2025-09-12 05:18:51', '2025-09-12 05:18:27', '2025-09-12 05:18:51'),
(57, 'Rose', 'Hicks', 18, 'qeqyfulyj@mailinator.com', '+1 (554) 936-5', NULL, '2025-09-12 05:23:44', '2025-09-12 05:23:44'),
(58, 'Austin', 'Rodgers', 15, 'sife@mailinator.com', '+1 (234) 704-8131', NULL, '2025-09-12 05:25:38', '2025-09-12 05:25:38'),
(59, 'Karina', 'Graham', 15, 'jyjelycuw@mailinator.com', '+1 (701) 149-3928', NULL, '2025-09-12 05:33:43', '2025-09-12 05:33:43'),
(60, 'Gage111', 'Petty', 20, 'jyjelycuw@mailinator1.com', '+1 (732) 977-5728', '2025-09-12 05:34:24', '2025-09-12 05:33:58', '2025-09-12 05:34:24');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_09_10_145708_create_personal_access_tokens_table', 1),
(5, '2025_09_10_222410_create_companies_table', 1),
(6, '2025_09_10_225941_create_employees_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('dGNrOj6zJNzsRtWe2z88aH6zTrLWohPSb0hdqeu7', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:143.0) Gecko/20100101 Firefox/143.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ2prRXZTTXIybmVwUTJYcEV6RFliWTN0cWd1cVBOUE9xSUJPb1lKcyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvdXNlciI7fX0=', 1757675432),
('Swy1EcoNdqIubF9ETWqbKzx16X6NDOBdlwPsTLiy', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:143.0) Gecko/20100101 Firefox/143.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM2htNnJjaDRyb1NMcTBGREVZMjNqQXIxZHU3RWs2THYwVkRwVXlGQiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvdXNlciI7fX0=', 1757673050);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `is_admin`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin Crm', 'admin@crm.com', '2025-09-11 04:48:25', 1, '$2y$12$B2hRAghECd6wSTIYP4zNfO1mal7mI9RZKigECGyUTFYDjei69hV6O', 'uw4t8X1jegB0OS0flIyfHVamjpJorIV8CpwNRWO4WUKL1CKhKoaCGptcSrkt', '2025-09-11 04:48:26', '2025-09-11 04:48:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employees_company_id_foreign` (`company_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
