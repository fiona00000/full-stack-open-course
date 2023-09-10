import React from 'react'
import '@testing-library/jest-dom'
import { getByText, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../Blog'

describe("render content", () => {
    const blog = {
        "title": "demo title_renders_content",
        "author": "demo author",
        "url": "http://demo.com",
        "likes": 1,
        "userId": "64ee7109e624d5c4695dd73c"
    }
    test('check author and title', () => {
        const { container } = render(<Blog blog={blog} />)

        const element = container.querySelector('.title_author')
        expect(element).toHaveTextContent(
            'demo title_renders_content by demo author'
        )
    })

    test('check url and like', () => {

        const { container } = render(<Blog blog={blog} />)

        const element = container.querySelector('.url_like')
        expect(element).toHaveTextContent(
            'http://demo.comlikes 1'
        )
    })
})

test('button testing', async () => {
    const blog = {
        "title": "demo title_renders_content",
        "author": "demo author",
        "url": "http://demo.com",
        "likes": 1,
        "userId": "64ee7109e624d5c4695dd73c"
    }

    const mockHandler = jest.fn()
    render(
        <Blog blog={blog} updateLike={mockHandler} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls.length).toEqual(2)
})