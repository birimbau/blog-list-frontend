import React, { useState } from 'react';

const NewBlog = ({ onSubmit }) => {
  const [blog, setBlog] = useState({});

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(blog);
        setBlog({});
      }}
    >
      <div>
        title
        <input
          id='title'
          type='text'
          value={blog.title}
          name='title'
          onChange={({ target }) =>
            setBlog({ ...blog, [target.name]: target.value })
          }
        />
      </div>
      <div>
        author
        <input
          id='author'
          type='text'
          value={blog.author}
          name='author'
          onChange={({ target }) =>
            setBlog({ ...blog, [target.name]: target.value })
          }
        />
      </div>
      <div>
        url
        <input
          id='url'
          type='text'
          value={blog.url}
          name='url'
          onChange={({ target }) =>
            setBlog({ ...blog, [target.name]: target.value })
          }
        />
      </div>
      <button className='submit-button' type='submit'>
        Create
      </button>
    </form>
  );
};

export default NewBlog;
