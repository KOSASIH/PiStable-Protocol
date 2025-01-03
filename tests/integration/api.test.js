// tests/integration/api.test.js
const request = require('supertest');
const app = require('../backend/server'); // Adjust the path as necessary

describe('API Endpoints', () => {
    it('POST /api/auth/register should create a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'password123',
                email: 'test@example.com',
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('username', 'testuser');
    });

    it('POST /api/auth/login should log in a user', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'password123',
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});
