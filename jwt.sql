-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 08, 2023 at 04:17 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jwt`
--

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'dev', 'developer', '2022-09-29 15:40:31', '2022-09-29 15:40:34'),
(2, 'Leader', 'Leader Project', '2022-10-09 10:39:41', '2022-10-09 10:39:41'),
(3, 'Customer', 'Our customer', '2022-10-09 10:39:41', '2022-10-09 10:39:41'),
(4, 'Guess', 'Our Guess', '2022-10-17 16:42:00', '2022-10-17 16:42:00');

-- --------------------------------------------------------

--
-- Table structure for table `group_roles`
--

CREATE TABLE `group_roles` (
  `id` int(11) NOT NULL,
  `roleId` int(11) DEFAULT NULL,
  `groupId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `group_roles`
--

INSERT INTO `group_roles` (`id`, `roleId`, `groupId`, `createdAt`, `updatedAt`) VALUES
(1, 1, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 2, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 5, 4, '2022-10-19 11:19:22', '2022-10-19 11:19:22');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `startDate` varchar(255) DEFAULT NULL,
  `customer` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `project_users`
--

CREATE TABLE `project_users` (
  `id` int(11) NOT NULL,
  `projectId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `url`, `description`, `createdAt`, `updatedAt`) VALUES
(1, '/user/read', 'show all datas', '2022-09-29 15:43:00', '2022-09-29 15:43:03'),
(2, '/users/create', 'create user', '2022-09-29 15:43:06', '2022-09-29 15:43:09'),
(3, '/users/delete', 'Delete User', '2022-09-29 15:43:45', '2022-09-29 15:43:49'),
(4, '/user/update', 'update user', '2022-10-19 10:41:09', '2022-10-19 10:41:09'),
(5, '/group/read', 'read group', '2022-10-19 10:41:09', '2022-10-19 10:41:09');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20220928144338-create-user.js'),
('migrate-group-role.js'),
('migrate-group.js'),
('migrate-project-user.js'),
('migrate-project.js'),
('migrate-role.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `groupId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `username`, `address`, `sex`, `phone`, `groupId`, `createdAt`, `updatedAt`) VALUES
(19, 'adasdasd', '1', '1', '1', '1', '1', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(21, 'anh@gmail.com', '$2b$10$i8pI2U8KlDZgxqtJ/LuF4OpstTJl8nIm/lwounhAi6Zr2CelOsKja', 'anh', NULL, NULL, '123123123', NULL, '2022-10-09 13:34:37', '2022-10-09 13:34:37'),
(22, '131232@gmail.com', '$2b$10$9/mw7RakO.6yRMVVYf4iIucae5l3v3VfE0iuk5WejWVHhR0djmlNO', 'long', NULL, NULL, '111', 4, '2022-10-11 15:10:35', '2022-10-11 15:10:35'),
(23, 'tobeshindaemon@gmail.com', '123123', '123123', 'Hoang Mai', '', '0912068446', 0, '2022-10-11 16:50:18', '2022-10-11 16:50:18'),
(28, 'tobeshindaemon@gmail.com', '123', 'admin_right', 'Hoang Mai', '', '0912068446', 0, '2022-10-15 08:23:29', '2022-10-15 08:23:29'),
(29, 'tobeshindaemon@gmail.com', '123', 'admin_right', 'Hoang Mai', '', '0912068446', 0, '2022-10-15 08:31:29', '2022-10-15 08:31:29'),
(31, 'tobeshindaemon@gmail.com', '234234', '234234', 'Hoang Mai', '', '0912068446', 3, '2022-10-15 08:32:30', '2022-10-15 08:32:30'),
(32, 'tobeshindaemon@gmail.com', '123', 'admin', 'Hoang Mai', '', '0912068446', 1, '2022-10-15 08:34:17', '2022-10-15 08:34:17'),
(33, 'tobeshindaemon@gmail.com', '123', 'admin', 'Hoang Mai', '', '0912068446', 0, '2022-10-15 08:35:08', '2022-10-15 08:35:08'),
(36, 'tobeshindaemon@gmail.com', '123', '123', 'Hoang Mai', '', '0912068446', 3, '2022-10-15 09:19:08', '2022-10-16 08:47:31'),
(38, 'guess@gmail.com', '123456', 'guess', NULL, NULL, '123213', 4, '2022-10-17 09:43:33', '2022-10-17 09:43:33'),
(39, '12312312@gmail.com', '$2b$10$T8U2trOSOwZMl4Y2c.Z6YerN4mZx.sURlmkvZNJvHMXfTIQl2OfgW', '123', NULL, NULL, '13213123', 4, '2022-10-17 09:45:23', '2022-10-17 09:45:23'),
(40, '123123@gmail.com', '$2b$10$T8U2trOSOwZMl4Y2c.Z6YerN4mZx.sURlmkvZNJvHMXfTIQl2OfgW', '124', NULL, NULL, '234234234', 4, '2022-10-17 09:46:21', '2022-10-17 09:46:21'),
(41, 'quang@gmail.com', '$2b$10$l0w36XI2323zuYpLsGpHje7VMb8WH5gId6tmGIrK3Hn.dMhni/60S', 'quang', NULL, NULL, '1312312312', 4, '2022-10-17 11:43:02', '2022-10-17 11:43:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group_roles`
--
ALTER TABLE `group_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_users`
--
ALTER TABLE `project_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `group_roles`
--
ALTER TABLE `group_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_users`
--
ALTER TABLE `project_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
