import React from 'react'
import { Flex } from 'rimble-ui'
import { useStoreState } from 'easy-peasy'
import { useEagerConnect, useInactiveListener } from '../hooks'

import { Layout } from './Layout'
import { Channel } from '../components/Channel'
import { EventToast } from '../components/EventToast'
import { Scroll } from '../components/Scroll'
import './App.css'

export default () => {
  const channels = useStoreState(state => state.channels.data)

  /* credit to uniswap interface
  https://github.com/Uniswap/uniswap-interface/blob/8a845ee0e969e127d7f778481197f043c67ea61a/src/hooks/index.ts#L16
  https://github.com/Uniswap/uniswap-interface/blob/d4911d1054403e6dac20185a1498b25059915bdd/src/components/Web3ReactManager/index.tsx#L22
  
  Behaviour to be tested?
  */
  const triedEager = useEagerConnect()

  /* after eagerly trying injected
  if the network connect ever isn't active or in an error state, activate it
  */
  useInactiveListener(!triedEager)
  return (
    <div className='App'>
      <Layout>
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
