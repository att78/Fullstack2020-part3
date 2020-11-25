const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('build'))

var morgan = require('morgan')

app.use(morgan('tiny'));

const cors = require('cors')
app.use(cors())

const Contact = require('./models/contact')

let persons =

    [
        {
            "name": "Arto Hellas",
            "number": "040-123457",
            "id": 1
        },
        {
            "name": "Ada Lovelace",
            "number": "39-44-5323523",
            "id": 2
        },
        {
            "name": "Dan Abramov",
            "number": "12-43-234345",
            "id": 3
        },
        {
            "name": "Mary Poppendieck",
            "number": "39-23-6423122",
            "id": 4
        }
    ]

let size = persons.length


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
        .then(result =>{
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {

    Contact.findById(request.params.id)
        .then(contact =>{
            if(contact){
                response.json(contact.toJSON())
            }else{
                response.status(404).end()
            }
        })
        .catch(error => next(error))

})


const generateId = () => {

    const min = 1
    const max = 100000

    return Math.floor(Math.random() * (max - min) + min)
}

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

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'Name is already on the list.'
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
    }else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
      }
  
    next(error)
  }
  
  app.use(errorHandler)



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
