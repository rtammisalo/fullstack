import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
      return state
    },
    setBlogs(state, action) {
      return action.payload
    },
    clearBlogs(state) {
      state = []
      return state
    },
  },
})

export const { addBlog, setBlogs, clearBlogs } = blogSlice.actions

export const createBlog = (user, blog, closeForm) => {
  return async (dispatch) => {
    try {
      const blogData = {
        title: blog.blogTitle,
        author: blog.blogAuthor,
        url: blog.blogUrl,
      }

      const createdBlog = await blogService.create(user, blogData)

      dispatch(
        setNotification(
          `a new blog ${createdBlog.title} by ${createdBlog.author} added`
        )
      )

      createdBlog.user = {
        id: createdBlog.user,
        name: user.name,
        username: user.username,
      }

      closeForm()
      dispatch(addBlog(createdBlog))
    } catch (error) {
      dispatch(setNotification(error.response.data, true))
    }
  }
}

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()

    dispatch(setBlogs(blogs))
  }
}

export default blogSlice.reducer
