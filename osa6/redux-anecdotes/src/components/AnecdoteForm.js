import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const createHandler = (event) => {
    event.preventDefault()

    const anecdoteText = event.target.anecdote.value
    event.target.anecdote.value = ''

    props.createAnecdote(anecdoteText)
    props.setNotification(`you added '${anecdoteText}'`, 5)
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

export default connect(null, {
  createAnecdote,
  setNotification
})(AnecdoteForm)