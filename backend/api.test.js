// File: backend/api.test.js
import request from 'supertest';
import express from 'express';
import cors from 'cors';
import routes from './routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

let token = '';
let createdItemId = '';

describe('API Tests', () => {
  describe('POST /login', () => {
    it('should return 200 and token for valid credentials', async () => {
      const res = await request(app)
        .post('/login')
        .send({ username: 'user', password: 'pass' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      token = res.body.token;
    });

    it('should return 401 for invalid credentials', async () => {
      const res = await request(app)
        .post('/login')
        .send({ username: 'wrong', password: 'incorrect' });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('POST /items', () => {
    it('should create item with valid token', async () => {
      const res = await request(app)
        .post('/items')
        .set('Authorization', `Bearer ${token}`)
        .send({ text: 'Test item' });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      createdItemId = res.body.id;
    });

    it('should fail to create item with invalid token', async () => {
      const res = await request(app)
        .post('/items')
        .set('Authorization', 'Bearer invalidtoken')
        .send({ text: 'Should fail' });

      expect(res.statusCode).toBe(401);
    });

    it('should fail to create item without authorization header', async () => {
      const res = await request(app)
        .post('/items')
        .send({ text: 'Should fail' });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /items', () => {
    it('should return items with valid token', async () => {
      const res = await request(app)
        .get('/items')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should fail with invalid token', async () => {
      const res = await request(app)
        .get('/items')
        .set('Authorization', 'Bearer invalidtoken');

      expect(res.statusCode).toBe(401);
    });

    it('should fail without authorization header', async () => {
      const res = await request(app)
        .get('/items');

      expect(res.statusCode).toBe(401);
    });
  });

  describe('PUT /items/:id', () => {
    it('should update item with valid token', async () => {
      const res = await request(app)
        .put(`/items/${createdItemId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ text: 'Updated text' });

      expect(res.statusCode).toBe(200);
      expect(res.body.text).toBe('Updated text');
    });

    it('should fail to update with invalid ID', async () => {
      const res = await request(app)
        .put('/items/invalidid')
        .set('Authorization', `Bearer ${token}`)
        .send({ text: 'Failing update' });

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });
  });

  describe('DELETE /items/:id', () => {
    it('should delete item with valid token', async () => {
      const res = await request(app)
        .delete(`/items/${createdItemId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
    });

    it('should fail to delete with invalid ID', async () => {
      const res = await request(app)
        .delete('/items/invalidid')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });
  });
});
