-- COPY characteristic_reviews(id, characteristic_id, review_id, value)
-- FROM '/Users/ptriklee/Hack Reactor/SDC2202/ratingsAndReviews/server/SDCCSVFILES/Characteristic_reviews.csv'
-- DELIMITER ','
-- CSV HEADER;

COPY characteristic_reviews(id, characteristic_id, review_id, value)
FROM '/home/ubuntu/Characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

-- COPY characteristics(id, product_id, name)
-- FROM '/Users/ptriklee/Hack Reactor/SDC2202/ratingsAndReviews/server/SDCCSVFILES/characteristics.csv'
-- DELIMITER ','
-- CSV HEADER;

COPY characteristics(id, product_id, name)
FROM '/home/ubuntu/characteristics.csv'
DELIMITER ','
CSV HEADER;

-- COPY products(id, name, slogan, description, category, default_price)
-- FROM '/Users/ptriklee/Hack Reactor/SDC2202/ratingsAndReviews/server/SDCCSVFILES/Products.csv'
-- DELIMITER ','
-- CSV HEADER;

COPY products(id, name)
FROM '/home/ubuntu/Products.csv'
DELIMITER ','
CSV HEADER;

-- COPY review_photos(id, review_id, url)
-- FROM '/Users/ptriklee/Hack Reactor/SDC2202/ratingsAndReviews/server/SDCCSVFILES/Review_photos.csv'
-- DELIMITER ','
-- CSV HEADER;

COPY review_photos(id, review_id, url)
FROM '/home/ubuntu/Review_photos.csv'
DELIMITER ','
CSV HEADER;

-- COPY review(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
-- FROM '/Users/ptriklee/Hack Reactor/SDC2202/ratingsAndReviews/server/SDCCSVFILES/Review.csv'
-- DELIMITER ','
-- CSV HEADER;

COPY review(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
FROM '/home/ubuntu/Review.csv'
DELIMITER ','
CSV HEADER;
