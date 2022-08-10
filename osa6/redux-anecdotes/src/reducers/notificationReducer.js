import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  message: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeNotification(state, action) {
      return { message: action.payload }
    },
    removeNotification(state, action) {
      return { message: null }
    }
  }
})

export const { changeNotification, removeNotification } = notificationSlice.actions

let timerId = null

export const setNotification = (message, time) => {
  return async dispatch => {
    if (timerId) {
      clearTimeout(timerId)
    }

    dispatch(changeNotification(message))
    timerId = setTimeout(() => {
      timerId = null
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer