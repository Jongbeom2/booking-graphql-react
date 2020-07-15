import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from '@apollo/client/link/context';
const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);