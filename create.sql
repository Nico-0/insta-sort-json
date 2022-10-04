CREATE TABLE `user` (
  `id` bigint unsigned NOT NULL,
  `username` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  `full_name` varchar(64) DEFAULT NULL,
  `profile_pic` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `biography` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `external_url` varchar(127) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `followed_by` int DEFAULT NULL,
  `follow` smallint DEFAULT NULL,
  `post_count` int DEFAULT NULL,
  `is_private` tinyint(1) DEFAULT NULL,
  `mutual_followed_by` smallint DEFAULT NULL,
  `updated` date DEFAULT NULL,
  `accepted` tinyint(1) DEFAULT '0',
  `discarded` tinyint(1) DEFAULT '0',
  `review` tinyint(1) DEFAULT '0',
  `last_click` datetime(4) DEFAULT NULL,
  `exported` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `post` (
  `user_id` bigint DEFAULT NULL,
  `post` varchar(420) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  UNIQUE KEY `post_UNIQUE` (`post`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
