CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id INT UNIQUE NOT NULL,
    user_id INT UNIQUE NOT NULL,
    quantity INT NOT NULL,
    status VARCHAR NOT NULL
);

ALTER TABLE orders ADD FOREIGN KEY (product_id) REFERENCES products (id);

ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users (id);