import React, { useEffect } from 'react'
import { Link, Text, Box } from 'rimble-ui'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import ConnectionBanner from '@rimble/connection-banner'

const injected = new InjectedConnector({
  /* Need to linclude all chains available in metamask
    in supportedChainIds so that the connection banner
    can display error messages correctly
  */
  supportedChainIds: [1, 2, 3, 4, 42, 5]
})

const { ethereum } = window

export const Header = props => {
  const context = useWeb3React()
  const { account, chainId, activate, deactivate, active, error } = context

  if (ethereum && ethereum.on && !active && !error) {
    activate(injected)
  }

  useEffect(() => {
    if (ethereum && ethereum.on && !active && !error) {
      const handleChainChanged = chainId => {
        activate(injected)
      }

      const handleAccountsChanged = accounts => {
        if (accounts.length > 0) {
          activate(injected)
        }
      }

      const handleNetworkChanged = networkId => {
        activate(injected)
      }

      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }

    return () => {}
  }, [active, error, activate])

  console.log(account)
  return (
    <>
      <Box
        alignItems='center'
        justifyContent='center'
        BoxDirection='column'
        mt={3}>
        Made by
        <Link href='https://twitter.com/r1oga' target='__blank' px={2}>
          @r1oga
        </Link>
        -
        <Link
          href='https://github.com/r1oga/channels-raidar'
          target='__blank'
          px={2}>
          GitHub
        </Link>
      </Box>
      <h1>CHANNELS RAIDAR</h1>
      <Text mb={4}>
        Monitoring of
        <Link px={2} href='https://raiden.network/' target='_blank'>
          Raiden Network
        </Link>
        Payment Channels
      </Text>
      <ConnectionBanner currentNetwork={chainId} requiredNetwork={5} />
      <p>Active account: {account}</p>
    </>
  )
}
