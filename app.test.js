const request = require('supertest');
const app = require('./index');

describe('App', () => {
  test('GET / should return hello world', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello World!');
  });

  test('GET /users should return users array', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('GET /users/:id should return specific user', async () => {
    const response = await request(app).get('/users/1');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBe('John Doe');
  });

  test('GET /users/:id should return 404 for non-existent user', async () => {
    const response = await request(app).get('/users/999');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('User not found');
  });

  test('POST /users should create new user', async () => {
    const newUser = { name: 'Test User' };
    const response = await request(app)
      .post('/users')
      .send(newUser);
    
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.id).toBeDefined();
  });

  test('POST /users should return 400 without name', async () => {
    const response = await request(app)
      .post('/users')
      .send({});
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Name is required');
  });
});
