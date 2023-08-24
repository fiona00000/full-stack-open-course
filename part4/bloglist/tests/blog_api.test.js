const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('blogs are returned as correct amount of blog posts (6) in the JSON format', async () => {
    const response = await api.get('/api/blogs')
        .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('unique identifier property of the blog posts is named id',
    async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    }
    , 100000)


afterAll(() => {
    mongoose.connection.close()
})