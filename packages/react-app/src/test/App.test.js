import React from 'react'
import { render, act } from '@testing-library/react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { StoreProvider } from 'easy-peasy'
import store from '../store'
import App from '../containers/App'

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/r1oga/raiden-channels'
})

const Providers = ({ children }) => (
  <ApolloProvider client={client}>
    <StoreProvider store={store}>{children}</StoreProvider>
  </ApolloProvider>
)

test('renders without crashing', async () => {
  await act(async () => {
    const { getByText } = render(<App />, { wrapper: Providers })
    expect(getByText('CHANNELS RAIDAR')).toBeInTheDocument()
  })
})

test('Select inputs are initially set to "All"', async () => {
  await act(async () => {
    const { getByLabelText } = render(<App />, { wrapper: Providers })
    const inputAddress = getByLabelText('Address')
    const inputChannels = getByLabelText('Channels')
    expect(inputAddress === 'All')
    expect(inputChannels === 'All')
  })
})
