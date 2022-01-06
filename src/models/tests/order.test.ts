import { Order, OrderStore } from './order';
import { Product, ProductStore } from './product';
import { User, UserStore } from './user';

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
        let product = await productStore.show(1);
        if (!product) {
            const newProduct: Product = {
                name: 'book3',
                price: 1.23,
                category: 'Books'
            };
            product = await productStore.create(newProduct);
        }

        let user = await userStore.show(1);
        if (!user) {
            const newUser: User = {
                firstname: 'John',
                lastname: 'Doe',
                password: 'password'
            };
            user = await userStore.create(newUser);
        }

        const order: Order = {
            product_id: product.id!,
            user_id: user.id!,
            quantity: 1,
            status: 'active'
        };

        const result = await orderStore.create(order);
        expect(result.product_id).toEqual(order.product_id);
        expect(result.user_id).toEqual(order.user_id);
        expect(result.quantity).toEqual(order.quantity);
        expect(result.status).toEqual(order.status);
    });

    it('create method should add an order - complete', async () => {
        let product = await productStore.show(2);
        if (!product) {
            const newProduct: Product = {
                name: 'book3',
                price: 1.23,
                category: 'Books'
            };
            product = await productStore.create(newProduct);
        }

        let user = await userStore.show(2);
        if (!user) {
            const newUser: User = {
                firstname: 'John',
                lastname: 'Doe',
                password: 'password'
            };
            user = await userStore.create(newUser);
        }

        const order: Order = {
            product_id: product.id!,
            user_id: user.id!,
            quantity: 1,
            status: 'complete'
        };

        const result = await orderStore.create(order);
        expect(result.product_id).toEqual(order.product_id);
        expect(result.user_id).toEqual(order.user_id);
        expect(result.quantity).toEqual(order.quantity);
        expect(result.status).toEqual(order.status);
    });

    it('index method should return a list of products', async () => {
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
});
