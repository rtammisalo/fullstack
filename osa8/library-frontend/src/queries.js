import { gql } from '@apollo/client'

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
        id
        born
        bookCount
      }
      id
      genres
    }
  }
`

export const ALL_GENRES = gql`
  query {
    allBooks {
      genres
    }
  }
`

export const ALL_GENRE_BOOKS = gql`
  query allGenreBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
        id
        born
        bookCount
      }
      id
      genres
    }
  }
`

export const ADD_NEW_BOOK = gql`
  mutation addNewBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`

export const SET_BIRTH_YEAR = gql`
  mutation setBirthYear($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      id
      born
      bookCount
    }
  }
`

export const SERVER_LOGIN = gql`
  mutation serverLogin($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
