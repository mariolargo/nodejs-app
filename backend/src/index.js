import express from 'express'
import responseTime from 'response-time'
import client from './redisClient.js'

client.on('error', (error) => {
  console.error(error)
})

const app = express()

app.use(responseTime())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/character', async (req, res) => {
  try {
    const cache = await client.get('characters')
    if (cache) {
      return res.json(JSON.parse(cache))
    }
    // https://jsonplaceholder.typicode.com/posts
    // https://rickandmortyapi.com/api/character
    const response = await fetch('https://rickandmortyapi.com/api/character', { signal: AbortSignal.timeout(5000) })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    await client.set('characters', JSON.stringify(data))
    res.json(data)
  } catch (error) {
    console.error('Fetch error:', error)
  }
})

app.get('/character/:id', async (req, res) => {
  try {
    const cache = await client.get('character_' + req.params.id)
    if (cache) {
      return res.json(JSON.parse(cache))
    }
    const response = await fetch('https://rickandmortyapi.com/api/character/' + req.params.id, {
      signal: AbortSignal.timeout(5000),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    await client.set('character_' + req.params.id, JSON.stringify(data))
    res.json(data)
  } catch (error) {
    console.error('Fetch error:', error)
  }
})

export default app
