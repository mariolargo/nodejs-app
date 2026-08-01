import { Router } from 'express'
import pool from '../database.js'

const router = Router()

router.get('/add', (req, res) => {
  res.render('links/add')
})

router.post('/add', async (req, res) => {
  const { title, url, description } = req.body
  const newLink = {
    title,
    url,
    description,
    user_id: req.user.id,
  }
  try {
    await pool.query('INSERT INTO links SET ?', [newLink])
    req.flash('success', 'Link saved successfully!')
    req.session.save(() => {
      res.redirect('/links')
    })
  } catch (err) {
    res.status(500).send('Error inserting item in database: ' + err)
  }
})

router.get('/', async (req, res) => {
  try {
    const links = await pool.query('SELECT * from links WHERE user_id = ?', [req.user.id])
    res.render('links/list', { links })
  } catch (err) {
    res.status(500).send('Error getting item in database: ' + err)
  }
})

router.get('/delete/:id', async (req, res) => {
  const { id } = req.params
  try {
    await pool.query('DELETE FROM links WHERE id = ?', [id])
    req.flash('success', 'Link removed successfully!')
    req.session.save(() => {
      res.redirect('/links')
    })
  } catch (err) {
    res.status(500).send('Error deleting item in database: ' + err)
  }
})

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params
  try {
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id])
    res.render('links/edit', { link: links[0] })
  } catch (err) {
    res.status(500).send('Error editing item in database: ' + err)
  }
})

router.post('/edit/:id', async (req, res) => {
  const { id } = req.params
  const { title, description, url } = req.body
  const newLink = {
    title,
    description,
    url,
  }
  try {
    await pool.query('UPDATE links SET ? WHERE id = ?', [newLink, id])
    req.flash('success', 'Link updated successfully!')
    req.session.save(() => {
      res.redirect('/links')
    })
  } catch (err) {
    res.status(500).send('Error updating item in database: ' + err)
  }
})

export default router
