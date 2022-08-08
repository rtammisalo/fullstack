import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  message: 'Welcome!'
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return { message: action.payload }
    },
    removeNotification(state, action) {
      return { message: null }
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer