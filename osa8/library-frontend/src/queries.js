import { gql } from '@apollo/client'

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    id
    born
    bookCount
  }
`

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
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        ...AuthorDetails
      }
      id
      genres
    }
  }
  ${AUTHOR_DETAILS}
`

export const ALL_GENRES = gql`
  query {
    allBooks(genre: "") {
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
        ...AuthorDetails
      }
      id
      genres
    }
  }
  ${AUTHOR_DETAILS}
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
      published
      author {
        ...AuthorDetails
      }
      id
      genres
    }
  }
  ${AUTHOR_DETAILS}
`

export const SET_BIRTH_YEAR = gql`
  mutation setBirthYear($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const SERVER_LOGIN = gql`
  mutation serverLogin($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
