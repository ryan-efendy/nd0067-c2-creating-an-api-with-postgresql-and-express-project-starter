import { mocked } from 'ts-jest/utils';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import { ProductStore } from '../models/product';
import { getProducts } from './product';

mocked(ProductStore);

const mockIndex = jest.fn();
jest.mock('../models/product', () => jest.fn().mockImplementation(() => ({ index: mockIndex })));

describe('Product controller', () => {
    describe('getProducts', () => {
        it('should call ProductStore index', async () => {
            const req = mockRequest();
            const res = mockResponse();

            const result = await getProducts(req, res);
            console.log(result);
            expect(mockIndex).toHaveBeenCalled();
        });
    });
});
