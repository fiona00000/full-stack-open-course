const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
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

    test('unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    }, 100000)
})

describe('addition of a new blog', () => {
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
})

describe('deletion of a note', () => {
    test('succeeds wiht status code 204 if id is valid', async () => {
        const blogAtStart = await helper.blogsInDb()
        const blogToDelete = blogAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const ids = blogsAtEnd.map(blog => blog.id)
        expect(ids).not.toContain(blogToDelete.id)
    })
})

afterAll(() => {
    mongoose.connection.close()
})