const { initialBlogs } = require('./testBlogData')

const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
})

test('when list has multiple value of blog, equals the sum of likes', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
})

describe('favorite blog', () => {

    const mostLikeObject = {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    }

    test('returns the blog object with most like', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(mostLikeObject)
    })
})

describe('most blog', () => {

    const mostBlogAuthor = {
        author: "Robert C. Martin",
        blogs: 3
    }

    test('returns the blog object with most like', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual(mostBlogAuthor)
    })
})