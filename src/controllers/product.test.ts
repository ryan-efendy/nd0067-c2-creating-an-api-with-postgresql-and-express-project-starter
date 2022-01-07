import { mocked } from 'ts-jest/utils';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import { ProductStore } from '../models/product';
import { getProducts } from './product';

jest.mock('../models/product');
mocked(ProductStore);
ProductStore.prototype.index = jest.fn();

describe('Product controller', () => {
    describe('getProducts', () => {
        it('should call ProductStore index', async () => {
            const req = mockRequest();
            const res = mockResponse();

            const result = await getProducts(req, res);
            // console.log(result);
            expect(ProductStore.prototype.index).toHaveBeenCalled();
        });
    });
});
