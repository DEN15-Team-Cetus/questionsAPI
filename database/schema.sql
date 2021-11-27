DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

\c reviews;

CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id INT,
  name VARCHAR(100)
);

COPY characteristics FROM '/Users/matthewdowell/Documents/Immersive/reviewsAPI/data/characteristics.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE characteristic_reviews (
  id SERIAL PRIMARY KEY,
  characteristic_id INT,
  review_id INT,
  value INT
);

COPY characteristic_reviews FROM '/Users/matthewdowell/Documents/Immersive/reviewsAPI/data/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE reviews_photos (
  id SERIAL PRIMARY KEY,
  review_id INT,
  url VARCHAR(500)
);

COPY reviews_photos FROM '/Users/matthewdowell/Documents/Immersive/reviewsAPI/data/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE reviews (
  review_id SERIAL PRIMARY KEY,
  product_id INT,
  rating INT,
  date BIGINT,
  summary VARCHAR(300),
  body VARCHAR(1000),
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR(100),
  reviewer_email VARCHAR(100),
  response VARCHAR(500),
  helpfulness INT
);

COPY reviews FROM '/Users/matthewdowell/Documents/Immersive/reviewsAPI/data/reviews.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE ratings 
AS SELECT product_id, rating, count(rating) 
FROM reviews 
GROUP BY product_id, rating;

CREATE TABLE recommended
AS SELECT product_id, recommend, count(recommend)
FROM reviews
GROUP BY product_id, recommend;

CREATE TABLE agg_characteristics 
AS SELECT id, product_id, characteristics.name
FROM characteristics;

ALTER TABLE ratings ADD COLUMN id SERIAL PRIMARY KEY;
ALTER TABLE recommended ADD COLUMN id SERIAL PRIMARY KEY;
ALTER TABLE agg_characteristics ADD COLUMN value INT;

SELECT a.id, a.product_id, a.name, AVG(c.value) AS value
  INTO agg_char_table
  FROM agg_characteristics AS a
  JOIN characteristic_reviews as c
    ON a.id = c.characteristic_id
 GROUP BY a.id, a.product_id, a.name;

SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('"reviews"', 'review_id')), (SELECT (MAX("review_id") + 1) FROM "reviews"), FALSE);
SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('"reviews_photos"', 'id')), (SELECT (MAX("id") + 1) FROM "reviews_photos"), FALSE);

insert into reviews (product_id) values (5);
insert into reviews_photos (review_id, url) values ((SELECT (MAX("review_id")) FROM "reviews"), UNNEST(ARRAY['foobar', 'ayoo']));