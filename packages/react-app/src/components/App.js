import React, { useEffect } from 'react'
import { Flex } from 'rimble-ui'
import { useStoreState } from 'easy-peasy'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'

import { Layout } from './Layout'
import { Channel } from './Channel'
import { Form } from './Form'
import { EventToast } from './EventToast'
import { Scroll } from './Scroll'
import './App.css'

const { ethereum } = window
const injected = new InjectedConnector({
  /* Need to include all chains that can be selected in metamask
    in supportedChainIds so that the connection banner
    can display warning messages accordingly
  */
  supportedChainIds: [1, 2, 3, 4, 42, 5]
})

export default () => {
  const channels = useStoreState(state => state.channels.data)
  const context = useWeb3React()
  const { activate, active, error } = context

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
  return (
    <div className='App'>
      <Layout>
        <Form />
        <EventToast />
        <Scroll>
          <Flex flexWrap='wrap' justifyContent='space-around'>
            {channels ? (
              channels.map((channel, index) => (
                <Channel key={index} {...channel} />
              ))
            ) : (
              <> </>
            )}
          </Flex>
        </Scroll>
      </Layout>
    </div>
  )
}
