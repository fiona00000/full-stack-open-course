const Blog = require('../models/blog')

const nonExistingId = async () => {
    const blog = new Blog({
        id: "5a422bc61b54a676234d17fc",
        title: "This blog will remove soon",
        author: "Testing",
        url: " ",
        likes: 2,
        __v: 0
    })
    await blog.save()
    await blog.remove()

    return blog.id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    nonExistingId, blogsInDb, usersInDb
}