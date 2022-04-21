-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;


-- Table 'Products'

DROP TABLE IF EXISTS `Products`;

CREATE TABLE `Products` (
  `id` SERIAL NOT NULL,
  `name` TEXT NOT NULL,
  `slogan` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `category` TEXT NOT NULL,
  `default_price` INTEGER NOT NULL
  PRIMARY KEY (`id`)
);


-- Table 'Characteristic_reviews'

DROP TABLE IF EXISTS `Characteristic_reviews`;

CREATE TABLE `Characteristic_reviews` (
  `id` SERIAL NOT NULL,
  `characteristic_id` INTEGER NOT NULL,
  `review_id` INTEGER NOT NULL,
  `value` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);


-- Table 'Characteristics'

DROP TABLE IF EXISTS `Characteristics`;

CREATE TABLE `Characteristics` (
  `id` SERIAL NOT NULL,
  `product_id` INTEGER NOT NULL,
  `name` TEXT NOT NULL,
  PRIMARY KEY (`id`)
);


-- Table 'Review Photos'

DROP TABLE IF EXISTS `Review Photos`;

CREATE TABLE `Review Photos` (
  `id` SERIAL NOT NULL,
  `review_id` INTEGER NOT NULL,
  `url` TEXT NOT NULL,
  PRIMARY KEY (`id`)
);


-- Table 'Review'

DROP TABLE IF EXISTS `Review`;

CREATE TABLE `Review` (
  `id` SERIAL NOT NULL,
  `product_id` INTEGER NOT NULL,
  `rating` INTEGER NOT NULL,
  `date` INTEGER NOT NULL,
  `summary` TEXT NOT NULL,
  `body` TEXT NOT NULL,
  `recommend` BOOLEAN NOT NULL,
  `reported` BOOLEAN NOT NULL,
  `reviewer_name` TEXT NOT NULL,
  `reviewer_email` TEXT NOT NULL,
  `response` TEXT NOT NULL,
  `helpfulness` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Characteristic_reviews` ADD FOREIGN KEY (product_id) REFERENCES `product` (`id`);
ALTER TABLE `Characteristics` ADD FOREIGN KEY (product_id) REFERENCES `product` (`id`);
ALTER TABLE `Review Photos` ADD FOREIGN KEY (review_id) REFERENCES `Review` (`id`);
ALTER TABLE `Review` ADD FOREIGN KEY (product_id) REFERENCES `product` (`id`);

-- ALTER TABLE `product` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Meta/Ratings` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Characteristics` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Review Photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Response from seller` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Review` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;