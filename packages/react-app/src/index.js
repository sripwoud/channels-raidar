import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { StoreProvider } from 'easy-peasy'
import './index.css'
import App from './App'
import store from './store'

// You should replace this uri with your own and put it into a .env file
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/r1oga/raiden-channels'
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </ApolloProvider>,
  document.getElementById('root')
)
