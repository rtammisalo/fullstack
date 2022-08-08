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
    }
  }
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer