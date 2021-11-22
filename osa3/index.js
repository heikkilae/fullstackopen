require('dotenv').config()
const express = require('express')
const cors = require('cors')
var morgan = require('morgan')

const Person = require('./models/person')

const app = express()

// Static is built-in middleware of Express to provice static content.
app.use(express.static('build'))
// Use express.json & morgan middlewares
app.use(express.json())
// Using a predefined format string
app.use(morgan('tiny'))

// Allow requests from other origins by using Node's cors middleware
app.use(cors())

// Info route
app.get('/info', (req, res) => {
  Person.countDocuments({}).then(count => {
    res.send(`
        <p>Phonebook has info for ${count} people </p>
        <p>${new Date()}</p>
        `)
  })
})

// Route to get all Persons
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

// Route to get specific Person
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  }).catch(error => next(error))
})

// Route to remove Person
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).end()
  }).catch(error => next(error))
})

// Route to add Person
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    const error = {
      name: 'NameOrNumber'
    }

    return next(error)
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response, next) => {
  const error = {
    name: 'Endpoint'
  }

  next(error)
}

// unknownEndpoint middleware
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  if (error.message)
    console.error(error.message)
  else
    console.error(error.name)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'Endpoint') {
    return response.status(404).send({ error: 'unknown endpoint' })
  } else if (error.name === 'NameOrNumber') {
    return response.status(400).json({ error: 'name or number missing' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: 'name must be unique' })
  }

  next(error)
}

// errorHandler is moved into middleware
app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})