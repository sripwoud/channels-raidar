import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { StoreProvider } from 'easy-peasy'
import { Web3ReactProvider } from '@web3-react/core'
import { theme } from 'rimble-ui'
import { ThemeProvider } from 'styled-components'
import * as ethers from 'ethers'
import './index.css'
import App from './App'
import store from './store'
import { ChannelFilter } from './constants'

const customTheme = {
  fonts: { serif: 'monospace', sansSerif: 'monospace' },
  colors: {
    ...theme.colors,
    primary: '#00D0F6',
    text: '#000',
    [ChannelFilter.open]: '#009CB9',
    [ChannelFilter.closed]: '#00687B',
    [ChannelFilter.settled]: '#00366A'
  }
}

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/r1oga/raiden-channels'
})

function getLibrary(provider) {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = 8000
  return library
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <StoreProvider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ThemeProvider theme={Object.assign({}, theme, customTheme)}>
          <App />
        </ThemeProvider>
      </Web3ReactProvider>
    </StoreProvider>
  </ApolloProvider>,
  document.getElementById('root')
)
