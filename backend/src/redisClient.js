// redisClient.js
import { createClient } from 'redis'

const client = await createClient({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
}).connect()

export default client
