import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      return state.map(s => s.id === action.payload ?
        { ...s, votes: s.votes + 1 } : s)
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()

    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (anecdoteText) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createAnecdote(anecdoteText)

    dispatch(addAnecdote(anecdote))
  }
}

export const voteAndUpdate = (anecdoteId) => {
  return async (dispatch, getState) => {
    dispatch(voteAnecdote(anecdoteId))
    const anecdote = getState().anecdotes.find(s => s.id === anecdoteId)
    await anecdoteService.updateAnecdote(anecdote)
  }
}

export default anecdoteSlice.reducer