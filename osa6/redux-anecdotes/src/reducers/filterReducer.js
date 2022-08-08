import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  content: ''
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      return { content: action.payload }
    }
  }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer