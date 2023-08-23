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

// Define a function called mostBlogs that receives an array of blogs as a parameter.The function returns the author who has the largest amount of blogs.The return value also contains the number of blogs the top author has:

const mostBlogs = (blogs) => {
    let authorBlogs = []
    authorBlogs = blogs.reduce((counts, blog) => {
        // if ()
        // if (!counts.some(entry => entry.author === blog.author)) {
        //     counts.push({ author: blog.author, blogs: 1 });
        // } else {
        //     const existingEntry = counts.find(entry => entry.author === blog.author);
        //     existingEntry.count++;
        // }
        // return counts;
    }, []);
    console.log(authorBlogs)
    // return authorBlogs.reduce((maxBlogs, current) => current.count > maxBlogs.count ? current : maxBlogs, authorBlogs[0])
}

mostBlogs(blogs)

const mostLikes = (blogs) => {

}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}