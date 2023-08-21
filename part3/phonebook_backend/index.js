require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Phonebook = require('./models/phonebook')

const app = express()

app.use(cors())
app.use(express.static('dist'))

morgan.token('req-body', (req, res) => {
    if (req.method === 'POST')
        return JSON.stringify(req.body)
    return ' '
})

app.use(express.json())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (request, response) => {
    Phonebook.find({})
        .then(persons => {
            response.json(persons)
        })
})

const generateId = () => {
    return Math.floor(Math.random() * 10000)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    } else {
        Phonebook.findOne({ name: body.name })
            .then(person => {
                if (person) {
                    return response.status(400).json({
                        error: 'name must be unique'
                    })
                }

                const phonebook = new Phonebook(
                    {
                        name: body.name,
                        number: body.number,
                    })

                phonebook.save()
                    .then(savedPerson => {
                        response.json(savedPerson)
                    })
            })

    }
})

app.get('/api/persons/:id', (request, response) => {
    Phonebook.findById(request.params.id)
        .then(person => {
            response.json(person)
        })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.get('/info', (request, response) => {
    const str = `<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`
    response.send(str)
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)