-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `Characteristic_reviews`;

CREATE TABLE `Characteristic_reviews` (
  `id` INTEGER DEFAULT NULL,
  `characteristic_id` INTEGER DEFAULT NULL,
  `review_id` INTEGER DEFAULT NULL,
  `value` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Characteristics'
--
-- ---

DROP TABLE IF EXISTS `Characteristics`;

CREATE TABLE `Characteristics` (
  `id` INTEGER DEFAULT NULL,
  `product_id` INTEGER DEFAULT NULL,
  `name` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Review Photos'
--
-- ---

DROP TABLE IF EXISTS `Review Photos`;

CREATE TABLE `Review Photos` (
  `id` INTEGER AUTO_INCREMENT DEFAULT NULL,
  `review_id` INTEGER DEFAULT NULL,
  `url` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
);


-- ---
-- Table 'Review'
--
-- --- id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness

DROP TABLE IF EXISTS `Review`;

CREATE TABLE `Review` (
  `id` INTEGER DEFAULT NULL,
  `product_id` INTEGER DEFAULT NULL,
  `rating` INTEGER DEFAULT NULL,
  `date` INTEGER DEFAULT NULL,
  `summary` TEXT DEFAULT NULL,
  `body` TEXT DEFAULT NULL,
  `recommend` BOOLEAN DEFAULT NULL,
  `reported` BOOLEAN DEFAULT NULL,
  `reviewer_name` TEXT DEFAULT NULL,
  `reviewer_email` TEXT DEFAULT NULL,
  `response` TEXT DEFAULT NULL,
  `helpfulness` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Characteristic_reviews` ADD FOREIGN KEY (product_id) REFERENCES `product` (`id`);
ALTER TABLE `Characteristics` ADD FOREIGN KEY (product_id) REFERENCES `product` (`id`);
ALTER TABLE `Review Photos` ADD FOREIGN KEY (review_id) REFERENCES `Review` (`id`);
ALTER TABLE `Review` ADD FOREIGN KEY (product_id) REFERENCES `product` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `product` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Meta/Ratings` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Characteristics` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Review Photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Response from seller` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Review` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;