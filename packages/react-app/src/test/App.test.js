import React from 'react'
import { render } from '@testing-library/react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { StoreProvider } from 'easy-peasy'
import store from '../store'
import App from '../components/App'

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/r1oga/raiden-channels'
})

const WrappedApp = () => (
  <ApolloProvider client={client}>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </ApolloProvider>
)

test('renders without crashing', () => {
  const { getByText } = render(<WrappedApp />)
  expect(getByText('CHANNELS RAIDAR')).toBeInTheDocument()
})

test('Select inputs are initially set to "All"', () => {
  const { getByLabelText } = render(<WrappedApp />)
  const inputAddress = getByLabelText('Address')
  const inputChannels = getByLabelText('Channels')
  expect(inputAddress === 'All')
  expect(inputChannels === 'All')
})
