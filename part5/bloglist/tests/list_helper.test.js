const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const { initialUsers, shortUserName, shortPassword } = require('../tests/testUserData')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })


})

describe('addition of a new user', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        await User.insertMany(initialUsers)
    })

    test('creation fails with proper statuscode and message if username or password length is less than 3', async () => {

        const result1 = await api
            .post('/api/users')
            .send(shortUserName)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result1.body.error).toContain('username must be longer than 3 characters')

        const result2 = await api
            .post('/api/users')
            .send(shortPassword)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result2.body.error).toContain('password must be longer than 3 characters')
    })
})

afterAll(() => {
    mongoose.connection.close()
})