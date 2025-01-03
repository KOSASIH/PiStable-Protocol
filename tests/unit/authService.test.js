// tests/unit/authService.test.js
const authService = require('../backend/services/authService');
const User = require('../backend/database/models/User');

jest.mock('../backend/database/models/User');

describe('Auth Service', () => {
    it('should register a new user', async () => {
        User.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(true),
        }));

        const user = await authService.register({
            username: 'testuser',
            password: 'password123',
            email: 'test@example.com',
        });

        expect(user).toHaveProperty('username', 'testuser');
    });

    it('should log in a user', async () => {
        User.findOne.mockResolvedValue({
            username: 'testuser',
            password: 'hashedpassword',
        });

        const token = await authService.login({
            username: 'testuser',
            password: 'password123',
        });

        expect(token).toBeDefined();
    });

    it('should throw an error for invalid credentials', async () => {
        User.findOne.mockResolvedValue(null);

        await expect(authService.login({
            username: 'wronguser',
            password: 'wrongpassword',
        })).rejects.toThrow('User  not found');
    });
});
