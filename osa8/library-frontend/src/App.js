import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommend from './components/Recommend'
import { BOOK_ADDED, ALL_GENRE_BOOKS } from './queries'

export const updateGenreQueries = (cache, book) => {
  const updateGenreQuery = (bookGenre) => {
    cache.updateQuery(
      {
        query: ALL_GENRE_BOOKS,
        variables: { genre: bookGenre },
      },
      (data) => {
        if (!data) {
          // Does not exist in cache yet
          return
        }

        const books = [...data.allBooks, book]
        const uniqueBooks = new Map(
          books.map((b) => b.id).map((id, i) => [id, books[i]])
        )

        return {
          allBooks: [...uniqueBooks.values()],
        }
      }
    )
  }

  updateGenreQuery('')

  const bookGenres = new Set(book.genres)

  for (let bookGenre of bookGenres.values()) {
    updateGenreQuery(bookGenre)
  }
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const updateToken = (token) => {
    setToken(token)
    localStorage.setItem('userToken', token)
    setPage('authors')
  }

  const logout = () => {
    updateToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    const token = localStorage.getItem('userToken')

    if (token) {
      setToken(token)
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const addedBook = subscriptionData.data.bookAdded

      updateGenreQueries(client.cache, addedBook)

      window.alert(`Added book ${addedBook.title} by ${addedBook.author.name}`)
    },
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && (
          <button onClick={() => setPage('recommend')}>recommend</button>
        )}
        {token && <button onClick={logout}>logout</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Login show={page === 'login'} updateToken={updateToken} />

      <Recommend show={page === 'recommend'} />
    </div>
  )
}

export default App
