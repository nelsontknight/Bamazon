DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price INT NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung 4K TV", "Electronics", 550, 15 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Lord of The Rings", "Books", 100, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Basketball Hoop", "Outdoors", 400, 5 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Milk", "Groceries", 3, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apples", "Produce", 2, 125);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Crayons", "Arts/Crafts", 10, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Smart Fridge", "Appliances", 2000, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Playstation 4", "Video Games", 400, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Legos", "Toys", 40, 34);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Lion King", "Movies", 20, 50);