import React from 'react';

const NewBlog = ({ onSubmit, blog, setBlog }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(blog);
      }}
    >
      <div>
        title
        <input
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
          type='text'
          value={blog.url}
          name='url'
          onChange={({ target }) =>
            setBlog({ ...blog, [target.name]: target.value })
          }
        />
      </div>
      <button type='submit'>Create</button>
    </form>
  );
};

export default NewBlog;
