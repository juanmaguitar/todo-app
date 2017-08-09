const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const pathPublic = path.join(__dirname, 'public')
const PORT = 3000

app.use( express.static(pathPublic) )
app.use( bodyParser.urlencoded({ extended: false }) )
app.use( bodyParser.json() )

app.set('view engine', 'pug')

let tasks = [
  {
    id: 1,
    title: 'buy milk',
    done: false,
    createdAt: +(new Date())
  },
  {
    id: 2,
    title: 'buy gold',
    done: false,
    createdAt: +(new Date())
  },
  {
    id: 3,
    title: 'buy bitcoins',
    done: true,
    createdAt: +(new Date())
  }
]

let counter = 3

app.get('/', (req,res) => {
  res.render('index', { tasks })
})

app.post('/tasks', (req,res) => {
  const title = req.body.task
  const newTask = {
    id: ++counter,
    title,
    done: false,
    createdAt: +(new Date())
  }
  tasks.push(newTask)
  res.redirect('/')
})

app.delete('/task/:id', (req,res) => {
  const id = +req.params.id
  tasks = tasks.filter( task => task.id !== id )
  res.send(`element w/ id ${id} has been removed`)
})

app.put('/task/:id', (req,res) => {
  const id = +req.params.id
  const done = req.body.done === 'true' ? true : false
  tasks = tasks.map( task => {
    if (task.id === id) task.done = done
    return task
  })
  res.send(`element w/ id ${id} has been updated`)
})

app.listen(PORT)
console.log(`Listening on PORT ${PORT}`)