const express = require('express')
const router = express.Router()

let counter = 3

router.get('/', (req, res) => {
  res.render('index', { tasks: req.session.tasks })
})

router.post('/tasks', (req, res) => {
  const title = req.body.task
  const newTask = {
    id: ++counter,
    title,
    done: false,
    createdAt: +(new Date())
  }
  req.session.tasks.push(newTask)
  res.redirect('/')
})

module.exports = router
