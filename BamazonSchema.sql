DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;


CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(20) NOT NULL,
  price INT NOT NULL default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("trumpet", "music", 500, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("drums", "music", 450, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("stormtroopers", "star wars", 1, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lightsabers", "star wars", 100000, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("batmobiles", "batman", 2500000, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("capes", "batman", 50, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tennis balls", "dog", 2, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dog bones", "dog", 5, 450);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("gonzos", "muppets", 50, 900);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("beakers", "muppets", 75, 1500);