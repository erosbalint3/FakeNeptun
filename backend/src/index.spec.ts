import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';

describe('Health Check', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.get('/health', (req, res) => {
      const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
      };
      res.status(200).json(healthcheck);
    });
  });

  it('should return 200 and health status', async () => {
    const response = await request(app).get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'OK');
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('database');
  });

  it('should have valid timestamp', async () => {
    const response = await request(app).get('/health');
    
    expect(response.body.timestamp).toBeGreaterThan(0);
    expect(typeof response.body.timestamp).toBe('number');
  });
});
