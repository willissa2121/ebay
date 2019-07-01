
USE bamazon_db;

drop table products;

CREATE TABLE products (
  id INTEGER(4) NOT NULL AUTO_INCREMENT,
  p_name VARCHAR(20) NOT NULL,
  p_price INTEGER(4) NOT NULL,
  p_inven INTEGER(4) NOT NULL,
  departmentId INTEGER(2) NOT NULL,
  totalEarnings INTEGER(5) NOT NULL,
  PRIMARY KEY (id)

);

INSERT INTO products(p_name,p_price,p_inven,departmentId,totalEarnings)VALUES("APPLE",5,100,1,0);
INSERT INTO products(p_name,p_price,p_inven,departmentId,totalEarnings)VALUES("orange",2,200,1,0);
INSERT INTO products(p_name,p_price,p_inven,departmentId,totalEarnings)VALUES("tv",100,10,2,0);
INSERT INTO products(p_name,p_price,p_inven,departmentId,totalEarnings)VALUES("fridge",300,5,2,0);

-- SELECT * FROM products;

-- CREATE TABLE departments (
--   id INTEGER(4) NOT NULL AUTO_INCREMENT,
--   d_name VARCHAR(15) NOT NULL,
--   d_earnings INTEGER(10) NOT NULL,
--   d_costs INTEGER(10) NOT NULL,
--   d_profit INTEGER(10) NOT NULL,
--   PRIMARY KEY (id)
-- );
-- INSERT INTO departments(d_name,d_earnings,d_costs,d_profit)VALUES("Produce", 0, 0, 0);
-- INSERT INTO departments(d_name,d_earnings,d_costs,d_profit)VALUES("Electronics", 0, 0, 0);
-- INSERT INTO departments(d_name,d_earnings,d_costs,d_profit)VALUES("Clothing", 0, 0, 0);




