const express = require('express')
const app = express()

app.use(express.json())

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

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/info', (req, res) => {

    res.send(`<p>Phonebook has info for ${size} people</p>

        <p> ${new Date()}</p >`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        console.log("success")
        response.json(person)
    } else {
        console.log("failed")
        response.status(404).end()
    }
})


const generateId = () => {

    const min = 1
    const max = 100000

    return Math.floor(Math.random() * (max - min) + min)
}

app.post('/api/persons', (request, response) => {
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

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }
    persons = persons.concat(person)
    response.json(person)
})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})