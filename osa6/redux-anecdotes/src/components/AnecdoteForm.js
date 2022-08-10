import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createHandler = (event) => {
    event.preventDefault()
    const anecdoteText = event.target.anecdote.value
    event.target.anecdote.value = ''

    createAnecdote(anecdoteText)
      .then(anecdote => {
        dispatch(addAnecdote(anecdote))
        dispatch(setNotification(`you added '${anecdote.content}'`))
      })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createHandler}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm