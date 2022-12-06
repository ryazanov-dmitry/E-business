

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";



CREATE TABLE `Drone` (
  `id` int NOT NULL,
  `name` text NOT NULL,
  `lattitude` decimal(10,5) NOT NULL,
  `longitude` decimal(10,5) NOT NULL,
  `url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



INSERT INTO `Drone` (`id`, `name`, `lattitude`, `longitude`, `url`) VALUES
(1, 'BeeDrone', '34.43242', '12.34340', 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'),
(2, 'Adorable Sensors', '12.54600', '74.23420', 'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZHJvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'),
(3, 'Blue Twirls', '12.54600', '74.23420', 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZHJvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'),
(4, 'Brigth Skies', '12.42300', '64.23400', 'https://images.unsplash.com/photo-1479152471347-3f2e62a2b2a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGRyb25lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60');


ALTER TABLE `Drone`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `Drone`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;
