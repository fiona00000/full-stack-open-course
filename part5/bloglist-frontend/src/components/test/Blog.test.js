import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../Blog'

test('renders content', () => {
    const blog = {
        "title": "demo title_renders_content",
        "author": "demo author",
        "url": "http://demo.com",
        "likes": 1,
        "userId": "64ee7109e624d5c4695dd73c"
    }

    const { container } = render(<Blog blog={blog} />)

    const element = container.querySelector('.title_author')
    expect(element).toHaveTextContent(
        'demo title_renders_content by demo author'
    )
})