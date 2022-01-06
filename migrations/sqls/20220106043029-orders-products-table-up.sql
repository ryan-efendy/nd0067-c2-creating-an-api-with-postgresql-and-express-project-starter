CREATE TABLE order_products (
	id SERIAL PRIMARY KEY,
	quantity INT,
	order_id INT UNIQUE NOT NULL,
	product_id INT UNIQUE NOT NULL
);

ALTER TABLE order_products ADD FOREIGN KEY (order_id) REFERENCES orders (id);
ALTER TABLE order_products ADD FOREIGN KEY (product_id) REFERENCES products (id);
