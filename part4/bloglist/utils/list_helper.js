const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, currentObject) => sum + currentObject.likes, 0)
}

module.exports = {
    totalLikes
}