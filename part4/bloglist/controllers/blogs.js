const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { checkRequiredField } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', checkRequiredField, async (request, response) => {
    const blog = new Blog(request.body)

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)

})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const blog = await Blog.findByIdAndRemove(request.params.id)
    if (blog) {
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

blogsRouter.put('/:id', async (request, response, nect) => {
    const body = request.body
    const updatedBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true, runValidators: true, context: 'query' })
    response.json(blog.toObject())
})


module.exports = blogsRouter