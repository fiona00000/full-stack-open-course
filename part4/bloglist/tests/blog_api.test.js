const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('notes are returned as correct amount of blog posts (6) in the JSON format', async () => {
    const response = await api.get('/api/blogs')
        .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(6)
}, 100000)


afterAll(() => {
    mongoose.connection.close()
})