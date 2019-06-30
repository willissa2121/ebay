
USE bamazon_db;

CREATE TABLE products (
  id INTEGER(4) NOT NULL AUTO_INCREMENT,
  p_name VARCHAR(20) NOT NULL,
  price INTEGER(4) NOT NULL,
  stock INTEGER(4) NOT NULL,
  PRIMARY KEY (id)

);

INSERT INTO products(p_name,price,stock)VALUES("APPLE",5,100);
INSERT INTO products(p_name,price,stock)VALUES("orange",2,200);
INSERT INTO products(p_name,price,stock)VALUES("tv",100,10);
INSERT INTO products(p_name,price,stock)VALUES("fridge",300,5);




