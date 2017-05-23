CREATE DATABASE burgers_db;

use burgers_db;

CREATE TABLE burgers(
  id INT AUTO_INCREMENT PRIMARY KEY,
  burger_name VARCHAR(248),
  devoured BOOLEAN NOT NULL,
  date TIMESTAMP
)
