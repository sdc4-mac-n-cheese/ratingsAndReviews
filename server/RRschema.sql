-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- Table 'Products'

DROP TABLE IF EXISTS Products;

CREATE TABLE Products (
  id SERIAL NOT NULL,
  name VARCHAR NOT NULL,
  PRIMARY KEY(id)
);


-- Table 'Characteristic_reviews'

DROP TABLE IF EXISTS Characteristic_reviews;

CREATE TABLE Characteristic_reviews (
  id SERIAL NOT NULL,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  value INTEGER NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(review_id) REFERENCES review(id)
);


-- Table 'Characteristics'

DROP TABLE IF EXISTS Characteristics;

CREATE TABLE Characteristics (
  id SERIAL NOT NULL,
  product_id INTEGER NOT NULL,
  name VARCHAR NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(product_id) REFERENCES product(id)
);


-- Table 'Review Photos'

DROP TABLE IF EXISTS Review_Photos;

CREATE TABLE Review_Photos (
  id SERIAL NOT NULL,
  review_id INTEGER NOT NULL,
  url VARCHAR NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(review_id) REFERENCES review(id)
);


-- Table 'Review'

DROP TABLE IF EXISTS Review;

CREATE TABLE Review (
  id SERIAL NOT NULL,
  product_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  date BIGINT NOT NULL,
  summary VARCHAR NOT NULL,
  body VARCHAR NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL,
  reviewer_name VARCHAR NOT NULL,
  reviewer_email VARCHAR NOT NULL,
  response VARCHAR NOT NULL,
  helpfulness INTEGER NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(product_id) REFERENCES product(id)
);

-- change date to timestamp

ALTER TABLE Review ALTER COLUMN date TYPE TEXT;
UPDATE review SET date = to_timestamp(review.date::bigint / 1000);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE Characteristic_reviews ADD FOREIGN KEY (review_id) REFERENCES Review (id);
ALTER TABLE Characteristics ADD FOREIGN KEY (product_id) REFERENCES Products (id);
ALTER TABLE Review Photos ADD FOREIGN KEY (review_id) REFERENCES Review (id);
ALTER TABLE Review ADD FOREIGN KEY (product_id) REFERENCES Products (id);

CREATE INDEX id_index ON review (id);
CREATE INDEX product_id_index ON review (product_id);
CREATE INDEX recommend_index ON review (recommend);
CREATE INDEX reported_index ON review (reported);
CREATE INDEX rating_index ON review (rating);
CREATE INDEX characteristic_id_index ON Characteristic_reviews (characteristic_id);
CREATE INDEX review_photos_id_index ON review_photos (id);
CREATE INDEX characteristics_product_id_index ON characteristics (product_id);
-- psql -U ptriklee -d ratingsreviews -a -f RRschema.sql
-- ^^ run from default terminal (first psql will select postgres)