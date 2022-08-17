import { useLazyQuery, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_GENRES, ALL_GENRE_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const allGenres = useQuery(ALL_GENRES, { skip: !props.show })
  const [getGenreBooks, result] = useLazyQuery(ALL_GENRE_BOOKS)

  useEffect(() => {
    getGenreBooks({ variables: { genre: genre } })
  }, [genre, getGenreBooks])

  if (!props.show || result.loading || allGenres.loading) {
    return null
  }

  const allBookGenres = new Set(
    allGenres.data.allBooks.map((b) => b.genres).flat()
  )

  return (
    <div>
      <h2>books</h2>
      {genre && (
        <div>
          in genre <b>{genre}</b>
        </div>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {[...allBookGenres.values()].map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setGenre('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
