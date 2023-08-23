const { blogs } = require('../tests/testBlogData')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, currentObject) => sum + currentObject.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((maxLike, current) => current.likes > maxLike.likes ? current : maxLike, blogs[0])
}

module.exports = {
    totalLikes, favoriteBlog
}