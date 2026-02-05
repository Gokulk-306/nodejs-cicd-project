const request = require('supertest');
const app = require('../src/app');

describe('API Endpoints', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('OK');
      expect(res.body.timestamp).toBeDefined();
    });
  });

  describe('GET /api/users', () => {
    it('should return users array', async () => {
      const res = await request(app).get('/api/users');
      expect(res.status).toBe(200);
      expect(res.body.users).toEqual([]);
      expect(res.body.message).toBe('Users endpoint working');
    });
  });

  describe('POST /api/users', () => {
    it('should create a user with valid data', async () => {
      const userData = { name: 'John Doe', email: 'john@example.com' };
      const res = await request(app).post('/api/users').send(userData);
      expect(res.status).toBe(201);
      expect(res.body.name).toBe(userData.name);
      expect(res.body.email).toBe(userData.email);
      expect(res.body.id).toBeDefined();
    });

    it('should return 400 for missing name', async () => {
      const res = await request(app).post('/api/users').send({ email: 'test@example.com' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Name and email required');
    });

    it('should return 400 for missing email', async () => {
      const res = await request(app).post('/api/users').send({ name: 'John' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Name and email required');
    });
  });

  describe('404 handler', () => {
    it('should return 404 for unknown routes', async () => {
      const res = await request(app).get('/unknown');
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Route not found');
    });
  });
});