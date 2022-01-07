import { Product, ProductStore } from '../product';
const store = new ProductStore();

describe('ProductStore', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    test.each`
        name             | price | category
        ${'book1'}       | ${1}  | ${'Books'}
        ${'electronic1'} | ${99} | ${'Electronics'}
        ${'clothing'}    | ${20} | ${'Clothing'}
    `('create method should add a product: $name, $price, $category', async ({ name, price, category }) => {
        const product: Product = {
            name,
            price,
            category
        };
        const result = await store.create(product);

        expect(result.name).toEqual(product.name);
        expect(result.price).toEqual(product.price);
        expect(result.category).toEqual(product.category);
    });

    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
    });

    it('show method should return the correct product', async () => {
        const product: Product = {
            name: 'book2',
            price: 9.99,
            category: 'Books'
        };
        const { id } = await store.create(product);

        const result = await store.show(id!);
        expect(result).toEqual({
            id,
            ...product
        });
    });

    it('delete method should remove the product', async () => {
        const product: Product = {
            name: 'book3',
            price: 19.99,
            category: 'Books'
        };
        const { id } = await store.create(product);

        await store.delete(id!);
        const result = await store.show(id!);

        expect(result).toEqual(undefined);
    });
});
