require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
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

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const phonebook = new Phonebook(
        {
            name: body.name,
            number: body.number,
        })

    phonebook.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(err => next(err))

})

app.get('/api/persons/:id', (request, response, next) => {
    Phonebook.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(err => {
            next(err)
        })
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const person = {
        name: body.name,
        number: body.number
    }

    Phonebook.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Phonebook.findByIdAndRemove(request.params.id)
        .then(person => {
            if (person) {
                response.status(204).end()
            } else {
                response.status(404).end()
            }
        })
        .catch(err => {
            next(err)
        })
})

app.get('/info', (request, response) => {
    const str = `<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`
    response.send(str)
})

const unknownEndpoint = (request, response) => {
    response.status(404)
        .send({ error: "unknown endpoint" })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400)
            .send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400)
            .json({ error: error.message })
    }

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)