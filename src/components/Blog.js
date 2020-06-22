import React, { useState } from 'react';
const Blog = ({ blog, likeBlog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const [open, setOpen] = useState(false);

  return (
    <div style={blogStyle}>
      <span className='title'>{blog.title}</span>{' '}
      <span className='author'>{blog.author}</span>{' '}
      <button
        className='toggle-button'
        onClick={() => {
          setOpen(!open);
        }}
      >
        {open ? 'close' : 'open'}
      </button>
      {open && (
        <>
          <p className='url'>{blog.url}</p>
          <p className='likes'>
            {blog.likes}{' '}
            <button
              className='like-button'
              onClick={() => {
                likeBlog({ ...blog, likes: blog.likes + 1 });
              }}
            >
              Like
            </button>
          </p>
          <p>{blog.author}</p>
          <button
            onClick={() => {
              const result = window.confirm(
                `Are you sure you want to delete ${blog.title} by ${blog.author}?`
              );
              if (result) {
                removeBlog(blog);
              }
            }}
          >
            Remove
          </button>
        </>
      )}
    </div>
  );
};

export default Blog;
