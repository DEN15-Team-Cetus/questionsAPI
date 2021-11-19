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