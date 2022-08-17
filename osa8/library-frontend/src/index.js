import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from 'apollo-link-context'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
})

const authenticator = setContext((_, { headers }) => {
  const token = localStorage.getItem('userToken')
  const auth = token ? `bearer ${token}` : null

  return {
    headers: {
      ...headers,
      authorization: auth,
    },
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authenticator.concat(httpLink),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
