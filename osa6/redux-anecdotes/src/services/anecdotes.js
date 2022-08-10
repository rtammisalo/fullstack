import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () => {
    return (axios
        .get(baseUrl)
        .then(response => response.data))
}

export const createAnecdote = (anecdoteText) => {
    const anecdote = {
        content: anecdoteText,
        votes: 0
    }

    return (axios
        .post(baseUrl, anecdote)
        .then(response => response.data))
}

const anecdoteService = { getAll, createAnecdote }
export default anecdoteService