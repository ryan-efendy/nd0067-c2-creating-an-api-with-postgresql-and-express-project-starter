import request from 'supertest';
import app from './app';

describe('GET /', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('👋 Hello World!');
    });
});

describe('GET /health', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/health');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('👍');
    });
});
