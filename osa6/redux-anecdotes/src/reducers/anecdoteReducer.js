const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const addAnecdote = (anecdoteText) => {
  return {
    type: 'NEW',
    data: { anecdote: anecdoteText }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(s => s.id === action.data.id ?
        { ...s, votes: s.votes + 1 } : s)
    case 'NEW':
      return [...state, asObject(action.data.anecdote)]
    default:
      return state
  }
}

export default reducer