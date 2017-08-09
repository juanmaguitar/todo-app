const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const moment = require('moment')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const app = express()
const pathPublic = path.join(__dirname, 'public')
const PORT = 3000

app.use(express.static(pathPublic))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  name: 'todo-app-session-cookie-id',
  secret: 'my-secret',
  store: new FileStore()
}))

app.set('view engine', 'pug')
app.locals.moment = moment

app.use((req, res, next) => {
  req.session.tasks = req.session.tasks ? req.session.tasks : require('./data/tasks.json')
  next()
})

app.use(require('./routes/tasks/'))

app.delete('/task/:id', (req, res) => {
  const id = +req.params.id
  req.session.tasks = req.session.tasks.filter(task => task.id !== id)
  res.send(`element w/ id ${id} has been removed`)
})

app.put('/task/:id', (req, res) => {
  const id = +req.params.id
  const done = req.body.done === 'true' ? true : false
  req.session.tasks = req.session.tasks.map(task => {
    if (task.id === id) task.done = done
    return task
  })
  res.send(`element w/ id ${id} has been updated`)
})

app.listen(PORT)
console.log(`Listening on PORT ${PORT}`)
