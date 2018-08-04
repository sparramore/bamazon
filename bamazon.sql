use bamazon;
drop table products;
create table products(
     item_id INTEGER NOT NULL AUTO_INCREMENT,
     product_name VARCHAR(100),
     department_name VARCHAR(100),
     price FLOAT(20,2),
     stock_quantity INTEGER(30),
     PRIMARY KEY (item_id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("widget","things",20,10);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("spanner","stuff",30,14);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("lightbulb_fluid","joke-products",5,100);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("flan","food",1000,1);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("water_hammer","joke-products",45,10);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("metric_screwdriver","joke-products",11,30);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("can_of_beep_for_horns","joke-products",50,15);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("metric_crescent_wrench","joke-products",12,10);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("turn_signal_fluid","joke-products",75,11);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("chem_light_batter","joke-products",500,3);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("headlight_fluid","joke-products",56,19);