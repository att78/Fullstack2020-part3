const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('build'))

var morgan = require('morgan')

app.use(morgan('tiny'))

const cors = require('cors')
app.use(cors())

const Contact = require('./models/contact')

app.get('/', (req, res) => {
  res.send('<h1>Hello World!!</h1>')
})

app.get('/api/persons', (request, response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})

app.get('/api/info', (request, response) => {
  Contact.find({}).then(data => {
    response.send(`<p>Phonebook has info for ${data.length} people</p>
        <p> ${new Date()}</p >`)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {

  Contact.findById(request.params.id)
    .then(contact => {
      if (contact) {
        response.json(contact.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))

})



app.post('/api/persons', (request, response, next) => {
  const body = request.body
  //console.log(body)
  if (!body.name) {
    return response.status(400).json({
      error: 'Name is missing'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'Number is missing'
    })
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
    // id: generateId(),
  })

  contact.save().then(savedContact => {
    response.json(savedContact.toJSON())
  })
    //persons = persons.concat(person)
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)



// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
