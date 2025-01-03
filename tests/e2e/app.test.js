// tests/e2e/app.test.js
const request = require('supertest');
const app = require('../backend/server'); // Adjust the path as necessary

describe('End-to-End Application Tests', () => {
    let token;

    beforeAll(async () => {
        // Register a user for testing
        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'password123',
                email: 'test@example.com',
            });

        // Log in to get a token
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'password123',
            });
        token = response.body.token;
    });

    it('should allow a logged-in user to create a proposal', async () => {
        const response = await request(app)
            .post('/api/governance/proposals')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'New Proposal',
                description: 'This is a test proposal.',
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('title', 'New Proposal');
    });

    it('should not allow unauthorized access to create a proposal', async () => {
        const response = await request(app)
            .post('/api/governance/proposals')
            .send({
                title: 'Unauthorized Proposal',
                description: 'This should fail.',
            });

        expect(response.status).toBe(401);
    });
});
