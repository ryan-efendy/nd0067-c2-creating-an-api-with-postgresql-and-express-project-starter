import { Order, OrderStore } from '../order';
import { ProductStore } from '../product';
import { UserStore } from '../user';

const orderStore = new OrderStore();
const productStore = new ProductStore();
const userStore = new UserStore();

describe('OrderStore', () => {
    it('should have an index method', () => {
        expect(orderStore.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(orderStore.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(orderStore.create).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(orderStore.delete).toBeDefined();
    });

    it('should have a getOrdersByUser method', () => {
        expect(orderStore.getOrdersByUser).toBeDefined();
    });

    it('create method should add an order - active', async () => {
        const user = await userStore.create({
            firstname: 'John',
            lastname: 'Doe',
            password: 'password'
        });

        const order: Order = {
            user_id: user.id!,
            quantity: 1,
            status: 'active'
        };

        const result = await orderStore.create(order);
        expect(result.user_id).toEqual(order.user_id);
        expect(result.quantity).toEqual(order.quantity);
        expect(result.status).toEqual(order.status);
    });

    it('create method should add an order - complete', async () => {
        const user = await userStore.create({
            firstname: 'Jane',
            lastname: 'Doe',
            password: 'password'
        });

        const order: Order = {
            user_id: user.id!,
            quantity: 1,
            status: 'complete'
        };

        const result = await orderStore.create(order);
        expect(result.user_id).toEqual(order.user_id);
        expect(result.quantity).toEqual(order.quantity);
        expect(result.status).toEqual(order.status);
    });

    it('index method should return a list of orders', async () => {
        const result = await orderStore.index();
        expect(result.length).toBeGreaterThan(0);
    });

    it('getOrdersByUser method should return orders belong to a user', async () => {
        const orders = await orderStore.index();

        if (orders.length > 0) {
            const result = await orderStore.getOrdersByUser(orders[0].user_id);
            expect(result.length).toBeGreaterThan(0);
            expect(result[0].user_id).toEqual(orders[0].user_id);

            result.forEach(({ user_id }) => {
                expect(user_id).toEqual(orders[0].user_id);
            });
        }
    });

    it('addProduct method should add a product to an order and return the updated order', async () => {
        const product = await productStore.create({
            name: 'book3',
            price: 1.23,
            category: 'Books'
        });

        const user = await userStore.create({
            firstname: 'Rhea',
            lastname: 'McLaughlin',
            password: 'password'
        });

        const order = await orderStore.create({
            user_id: user.id!,
            quantity: 1,
            status: 'active'
        });

        await orderStore.addProduct(1, order.id!, product.id!);

        let products = await orderStore.getProducts(order.id!);
        expect(products.length).toBeGreaterThan(0);

        const currentNumberOfProducts = products.length;

        const anotherProduct = await productStore.create({
            name: 'book4',
            price: 2.46,
            category: 'Books'
        });

        await orderStore.addProduct(2, order.id!, anotherProduct.id!);

        products = await orderStore.getProducts(order.id!);

        expect(products.length).toStrictEqual(currentNumberOfProducts + 1);
    });
});
