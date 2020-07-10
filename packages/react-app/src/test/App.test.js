import React from 'react'
import { render, act, fireEvent, screen } from '@testing-library/react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { StoreProvider } from 'easy-peasy'
import { store } from '../store'
import { App } from '../containers/App'

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/r1oga/raiden-channels'
})

const Providers = ({ children }) => (
  <ApolloProvider client={client}>
    <StoreProvider store={store}>{children}</StoreProvider>
  </ApolloProvider>
)

const setup = () => render(<App />, { wrapper: Providers })

test('renders without crashing', async () => {
  await act(async () => {
    const { getByText } = setup()

    // Title is in?
    expect(getByText('CHANNELS RAIDAR')).toBeInTheDocument()

    // Footer is in?
    expect(getByText('GitHub')).toBeInTheDocument()
  })
})

test('initially, filters selector are set to "All"', async () => {
  await act(async () => {
    const { getByLabelText } = setup()

    // Intial select inputs set to 'all
    ;['Address', 'Channels'].forEach(filter => {
      expect(getByLabelText(filter)).toHaveTextContent('All')
    })
  })
})

// test('displays only open, closed, or settled channels when selecting the corresponding filter', async () => {
//   await act(async () => {
//     // need to mock API call
//     const { getByLabelText } = setup()
//     ;['open', 'closed', 'settled'].forEach(status => {
//       fireEvent.change(getByLabelText('Channels'), {
//         target: { value: status }
//       })
//       expect(getByLabelText('Channels')).toHaveValue(status)
//     })
//   })
// })
