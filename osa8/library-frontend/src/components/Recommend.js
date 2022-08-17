import { useQuery, useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'
import { ME, ALL_GENRE_BOOKS } from '../queries'
import BooksTable from './BooksTable'

const Recommend = (props) => {
  const userData = useQuery(ME)
  const [getGenreBooks, result] = useLazyQuery(ALL_GENRE_BOOKS)

  useEffect(() => {
    if (!userData.loading) {
      getGenreBooks({ variables: { genre: userData.data.me.favoriteGenre } })
    }
  }, [userData, getGenreBooks])

  if (!props.show || userData.loading) {
    return null
  }

  const favoriteGenre = userData.data.me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <b>{favoriteGenre}</b>
      </div>
      <BooksTable books={result.data.allBooks} />
    </div>
  )
}

export default Recommend
