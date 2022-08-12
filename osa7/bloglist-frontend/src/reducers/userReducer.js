import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { clearBlogs, getBlogs } from './blogReducer'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser() {
      return null
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      dispatch(setUser(user))
      dispatch(getBlogs())
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    } catch (exception) {
      dispatch(setNotification(exception.response.data, true))
    }
  }
}

export const restoreLoggedUser = () => {
  return async (dispatch) => {
    const userJSON = window.localStorage.getItem('loggedUser')

    if (userJSON) {
      dispatch(setUser(JSON.parse(userJSON)))
      dispatch(getBlogs())
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser')
    dispatch(removeUser())
    dispatch(clearBlogs())
  }
}

export default userSlice.reducer
