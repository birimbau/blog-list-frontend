import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('renders content', () => {
  const blog = {
    author: 'test author',
    id: '5ed5296c5f570e5b6c39a1ee',
    likes: 8,
    title: 'test',
    url: 'www.url.com',
  };

  const component = render(<Blog blog={blog} />);

  const title = component.container.querySelector('.title');
  const author = component.container.querySelector('.author');
  const url = component.container.querySelector('.url');
  const likes = component.container.querySelector('.likes');

  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(url).toBeNull();
  expect(likes).toBeNull();
});

test('renders the remaining content if button is clicked', () => {
  const blog = {
    author: 'test author',
    id: '5ed5296c5f570e5b6c39a1ee',
    likes: 8,
    title: 'test',
    url: 'www.url.com',
  };

  const component = render(<Blog blog={blog} />);

  const title = component.container.querySelector('.title');
  const author = component.container.querySelector('.author');
  const button = component.container.querySelector('.toggle-button');
  fireEvent.click(button);
  const url = component.container.querySelector('.url');
  const likes = component.container.querySelector('.likes');

  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(url).toBeDefined();
  expect(likes).toBeDefined();
});

test('like event handler is clicked twice', () => {
  const blog = {
    author: 'test author',
    id: '5ed5296c5f570e5b6c39a1ee',
    likes: 8,
    title: 'test',
    url: 'www.url.com',
  };
  const mockHandler = jest.fn();
  const component = render(<Blog blog={blog} likeBlog={mockHandler} />);

  const button = component.container.querySelector('.toggle-button');
  fireEvent.click(button);

  const likeButton = component.container.querySelector('.like-button');
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
