import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import NewBlog from './NewBlog';

test('For is submitted successfully', () => {
  const blog = {
    author: 'test author',
    id: '5ed5296c5f570e5b6c39a1ee',
    likes: 8,
    title: 'test',
    url: 'www.url.com',
  };
  const mockHandler = jest.fn();
  const component = render(<NewBlog blog={blog} onSubmit={mockHandler} />);
  const form = component.container.querySelector('form');
  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');

  fireEvent.change(title, {
    target: { value: 'title test' },
  });

  fireEvent.change(author, {
    target: { value: 'author test' },
  });

  fireEvent.change(url, {
    target: { value: 'url test' },
  });

  fireEvent.submit(form);
  expect(mockHandler.mock.calls).toHaveLength(1);
  console.log('TEST', JSON.stringify(mockHandler.mock.calls));

  expect(mockHandler.mock.calls[0][0].title).toBe('title test');
  expect(mockHandler.mock.calls[0][0].author).toBe('author test');
  expect(mockHandler.mock.calls[0][0].url).toBe('url test');
});
