-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 14, 2025 at 02:37 PM
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
  `email` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL COMMENT 'file path to logo',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `name`, `email`, `website`, `logo`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Roob, Schaefer and Dicki', NULL, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(2, 'Bogisich, Lubowitz and Stanton', NULL, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(3, 'Prohaska, Schmidt and Raynor', NULL, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(4, 'Larkin, Powlowski and Abshire', 'miller.pete@bashirian.com', 'https://www.gutkowski.com', 'https://placehold.co/100', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(5, 'Murray LLC', NULL, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(6, 'Morar, Effertz and Kertzmann', 'umante@pouros.com', 'https://www.auer.com', 'https://placehold.co/100', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(7, 'Oberbrunner-Hand', NULL, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(8, 'Leffler, Schuppe and Parisian', NULL, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(9, 'Dickens, Schuster and Larkin', NULL, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(10, 'Koelpin Inc', NULL, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(11, 'Jast, Beier and Douglas', 'weissnat.twila@collins.com', 'https://www.kling.net', 'https://placehold.co/100', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(12, 'Hyatt, Reinger and Hickle', 'uleuschke@buckridge.com', 'https://www.denesik.org', 'https://placehold.co/100', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(13, 'Ferry-Conroy', 'mia69@altenwerth.biz', 'https://www.gerlach.com', 'https://placehold.co/100', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(14, 'Russel, Dach and Rohan', NULL, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(15, 'Douglas, Welch and Will', NULL, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(16, 'Cartwright, West and Jones', 'hermiston.mackenzie@goyette.com', 'https://www.boyle.com', 'https://placehold.co/100', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(17, 'Mohr-Leffler', NULL, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(18, 'Nolan Inc', 'nico07@stokes.info', 'https://www.stracke.info', 'https://placehold.co/100', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(19, 'Daugherty PLC', 'rondricka@reinger.com', 'https://www.roob.com', 'https://placehold.co/100', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(20, 'Ritchie PLC', 'award@howell.org', 'https://www.prohaska.org', 'https://placehold.co/100', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `company_id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `first_name`, `last_name`, `company_id`, `email`, `phone`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Perry', 'Reinger', 7, 'abner.romaguera@example.org', '1-888-482-7979', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(2, 'Rollin', 'Eichmann', 9, 'germaine.kihn@example.com', '1-800-599-7104', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(3, 'Ena', 'McLaughlin', 6, 'madonna.farrell@example.net', '(888) 936-6619', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(4, 'Maegan', 'Kautzer', 2, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(5, 'Joan', 'Lebsack', 3, 'jared41@example.com', '1-844-417-1143', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(6, 'Hilario', 'Haley', 10, 'finn.raynor@example.net', '1-888-864-5354', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(7, 'Kailey', 'Lemke', 1, 'carolyne.wilkinson@example.com', '866.719.7420', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(8, 'Beaulah', 'Jast', 2, 'noconner@example.org', '(844) 208-6486', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(9, 'Reece', 'Wuckert', 4, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(10, 'Cielo', 'Larkin', 8, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(11, 'Coralie', 'Nienow', 5, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(12, 'Lessie', 'Beier', 10, 'beier.joan@example.net', '877.644.1868', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(13, 'Adrian', 'Effertz', 9, 'polly.howell@example.com', '855.946.2336', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(14, 'Marco', 'Kozey', 3, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(15, 'Burley', 'Parker', 4, 'oberbrunner.glenda@example.net', '800.939.5390', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(16, 'Tiara', 'Boyle', 7, 'michel50@example.net', '1-855-523-8802', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(17, 'Tierra', 'Luettgen', 8, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(18, 'Kristy', 'Roob', 3, 'skylar.quigley@example.com', '1-844-389-7411', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(19, 'Okey', 'Oberbrunner', 7, 'leuschke.sage@example.net', '1-855-591-4882', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(20, 'Chelsie', 'Welch', 1, 'jaclyn.greenholt@example.org', '(888) 455-5470', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(21, 'Earline', 'Okuneva', 7, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(22, 'Merle', 'Barton', 3, 'leora.senger@example.net', '844-682-5445', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(23, 'Timmy', 'Cormier', 5, 'cleve27@example.net', '866-764-7941', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(24, 'Sydnee', 'Pagac', 6, 'mboyer@example.org', '(888) 345-0777', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(25, 'Zena', 'Smitham', 5, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(26, 'Vergie', 'Quitzon', 4, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(27, 'Finn', 'Hamill', 6, 'drew.durgan@example.org', '1-800-443-5067', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(28, 'Elvie', 'Barrows', 7, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(29, 'Madelynn', 'Toy', 1, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(30, 'Kattie', 'Wintheiser', 8, 'mattie44@example.com', '(866) 469-8677', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(31, 'Lorine', 'Kirlin', 4, 'jast.mckenna@example.net', '(844) 715-6184', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(32, 'Antoinette', 'Moen', 1, 'shanahan.arno@example.net', '1-888-301-0055', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(33, 'Fletcher', 'Bahringer', 3, 'lou.mueller@example.com', '1-866-851-3882', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(34, 'Vada', 'Goldner', 9, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(35, 'Margarete', 'O\'Hara', 6, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(36, 'Greyson', 'Volkman', 2, 'brakus.cleo@example.net', '1-877-760-3457', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(37, 'Bessie', 'Veum', 4, 'wilford19@example.org', '1-844-791-5945', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(38, 'Casandra', 'Ward', 1, 'cummerata.jean@example.com', '877-732-7166', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(39, 'Modesto', 'Hackett', 2, 'holly.wisoky@example.net', '800-571-6438', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(40, 'Barbara', 'Pouros', 5, 'zhill@example.net', '(866) 697-7854', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(41, 'Jaqueline', 'Russel', 4, 'buster.lebsack@example.com', '(800) 555-0851', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(42, 'Citlalli', 'Terry', 6, 'breitenberg.lora@example.net', '(866) 788-6140', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(43, 'Camryn', 'Bogan', 5, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(44, 'Brandon', 'Durgan', 6, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(45, 'Madeline', 'Jacobs', 7, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(46, 'Rosalinda', 'DuBuque', 7, 'schimmel.willard@example.com', '(855) 896-2986', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(47, 'Tomas', 'Mayert', 1, 'noelia91@example.com', '(888) 973-5395', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(48, 'Brook', 'Torphy', 9, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(49, 'Missouri', 'Murphy', 4, 'markus.bins@example.com', '800.886.6261', NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43'),
(50, 'Albina', 'Schamberger', 10, NULL, NULL, NULL, '2025-09-14 07:06:43', '2025-09-14 07:06:43');

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
(1, 'Admin Crm', 'admin@crm.com', '2025-09-14 07:06:42', 1, '$2y$12$/yNGwi//zVl3IarynDTW1uMdsBSCV5zgdZOAhp1nl9lu5iSPA4qJW', 'Aols5aGQt7', '2025-09-14 07:06:43', '2025-09-14 07:06:43');

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

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
