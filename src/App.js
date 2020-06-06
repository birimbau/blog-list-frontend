import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [blog, setBlog] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    loginService.logout();
    setUser(null);
  };

  const createBlog = async (event) => {
    event.preventDefault();
    try {
      const response = await blogService.create(blog);
      setBlogs(blogs.concat(response));
      setBlog({});
      setSuccessMessage(response.title);
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (exception) {}
  };

  const loginForm = () => {
    return (
      <div>
        {errorMessage && <div className='error'>Wrong credentials</div>}
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    );
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {successMessage && (
        <div className='info'>a new blog {successMessage} added</div>
      )}
      <p>{user.root} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <h2>Create New</h2>
      <form onSubmit={createBlog}>
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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
