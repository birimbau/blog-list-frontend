import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Toggable from './components/Toggable';
import NewBlog from './components/NewBlog';
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
  const blogFormRef = useRef(null);

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

  const createBlog = async (blog) => {
    try {
      const response = await blogService.create(blog);
      setBlogs(blogs.concat(response));
      setBlog({});

      blogFormRef.current.toggleVisibility();
      setSuccessMessage(response.title);
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (exception) {}
  };

  const updateBlog = async (blog) => {
    try {
      const response = await blogService.update(blog);

      setBlogs(
        blogs.map((x) => {
          if (x.id === response.id) {
            return response;
          }

          return x;
        })
      );
    } catch (exception) {}
  };

  const removeBlog = async (blog) => {
    try {
      await blogService.remove(blog);

      const index = blogs.findIndex((x) => x.id === blog.id);

      setBlogs([...blogs.slice(0, index), ...blogs.slice(index + 1)]);
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
              id='username'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type='submit'>
            login
          </button>
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
      <button id='logout-button' onClick={handleLogout}>
        logout
      </button>
      <h2>Create New</h2>
      <Toggable
        className='create-new'
        labelClosed='new blog'
        labelOpened='cancel'
        ref={blogFormRef}
      >
        <NewBlog onSubmit={createBlog} blog={blog} setBlog={setBlog} />
      </Toggable>
      {blogs
        .sort((a, b) => {
          if (a.likes > b.likes) {
            return -1;
          }
          if (a.likes < b.likes) {
            return 1;
          }
          return 0;
        })
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={(newObject) => {
              const modelNoUser = { ...newObject };
              delete modelNoUser.user;
              updateBlog(modelNoUser);
            }}
            removeBlog={removeBlog}
          />
        ))}
    </div>
  );
};

export default App;
