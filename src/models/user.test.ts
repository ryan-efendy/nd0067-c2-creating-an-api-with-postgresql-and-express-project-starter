import { User, UserStore } from './user';
const store = new UserStore();

describe('UserStore', () => {
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

    it('should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });

    test.each`
        firstname   | lastname    | password
        ${'James'}  | ${'Webb'}   | ${'PdkpFG65apYARRk'}
        ${'Philip'} | ${'Taylor'} | ${'s9M9heFhMn35UWk'}
        ${'Vicki'}  | ${'Barnes'} | ${'uejb7VSWFxJDD77'}
    `(
        'create method should add a user: $firstname, $lastname, $password',
        async ({ firstname, lastname, password }) => {
            const user: User = {
                firstname,
                lastname,
                password
            };
            const result = await store.create(user);

            expect(result.firstname).toEqual(user.firstname);
            expect(result.lastname).toEqual(user.lastname);
        }
    );

    it('index method should return a list of users', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
    });

    it('show method should return the correct user', async () => {
        const user: User = {
            firstname: 'John',
            lastname: 'Smith',
            password: '6ewKfUGt4Ejzzxs'
        };
        const { id } = await store.create(user);

        const result = await store.show(id!);

        expect(result.firstname).toEqual(user.firstname);
        expect(result.lastname).toEqual(user.lastname);
    });

    it('delete method should remove the user', async () => {
        const user: User = {
            firstname: 'John',
            lastname: 'Smith',
            password: '6ewKfUGt4Ejzzxs'
        };
        const { id } = await store.create(user);

        await store.delete(id!);
        const result = await store.show(id!);

        expect(result).toEqual(undefined);
    });
});
