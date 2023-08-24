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

test('a valid blog is added', async () => {
    const newBlog = {
        title: "Testing Blog",
        author: "Test",
        url: "nothing",
        likes: 7,
        __v: 0
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
        .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
}, 100000)

test('empty like will be 0', async () => {
    const newBlog = {
        title: "Testing Blog",
        author: "Test",
        url: "nothing",
        __v: 0
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
    const response = await api.get('/api/blogs')
    expect(response.body[helper.initialBlogs.length].likes).toBe(0)
})

test('return 400 if title or url missing', async () => {
    const newBlog1 = {
        author: "Test",
        url: "nothing",
        likes: 7,
        __v: 0
    }

    const newBlog2 = {
        title: "Testing Blog",
        author: "Test",
        likes: 7,
        __v: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog1)
        .expect(400)

    await api
        .post('/api/blogs')
        .send(newBlog2)
        .expect(400)

})


afterAll(() => {
    mongoose.connection.close()
})