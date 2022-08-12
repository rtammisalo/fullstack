import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    changeNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    },
  },
})

export const { changeNotification, clearNotification } =
  notificationSlice.actions

let timerId = null

export const setNotification = (message, error = false) => {
  return async (dispatch) => {
    if (timerId) {
      clearTimeout(timerId)
    }

    dispatch(changeNotification({ text: message, error: error }))
    timerId = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer
