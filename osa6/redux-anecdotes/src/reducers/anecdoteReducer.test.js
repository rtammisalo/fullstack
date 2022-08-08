import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

const initialState = [
    {
        content: 'If it hurts, do it more often',
        id: 1,
        votes: 0
    },
    {
        content: 'Adding manpower to a late software project makes it later!',
        id: 2,
        votes: 0
    },
    {
        content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        id: 3,
        votes: 0
    },
]

describe('anecdoteReducer', () => {
    test('adds to votes with action VOTE', () => {
        const state = initialState
        const action = {
            type: 'VOTE',
            data: {
                id: 2
            }
        }

        deepFreeze(state)
        const newState = anecdoteReducer(state, action)

        expect(newState).toContainEqual({
            content: 'Adding manpower to a late software project makes it later!',
            id: 2,
            votes: 1
        })
    })

    test('adds a new anecdote with action NEW', () => {
        const state = initialState
        const anecdote = 'Premature optimization is the root of all evil.'
        const action = {
            type: 'NEW',
            data: {
                anecdote: anecdote
            }
        }

        deepFreeze(state)
        expect(state).toHaveLength(3)

        const newState = anecdoteReducer(state, action)

        expect(newState).toHaveLength(4)
        expect((newState.find(s => s.content === anecdote)).content).toBe(anecdote)
    })
})