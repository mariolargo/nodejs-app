import redisClient from '../src/redisClient.js'
const { default: app } = await import('../src/index.js')
const { default: request } = await import('supertest')

describe('Character Routes Testing', () => {
  // Test Case 1: GET Request
  test('GET /character should return all characters', async () => {
    const response = await request(app).get('/character').expect('Content-Type', /json/) // Validates header response type

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('info')
    expect(response.body).toHaveProperty('results')
  })

  // Test Case 2: GET Request
  test('GET /character/:id should return existing character', async () => {
    const validId = 1
    const response = await request(app).get(`/character/${validId}`).expect('Content-Type', /json/) // Validates header response type

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('status')
    expect(response.body.name).toBe('Rick Sanchez')
  })

  afterAll(async () => {
    // Closes the open socket connection
    await redisClient.disconnect()
  })
})
