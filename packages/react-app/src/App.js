import React from 'react'
import { Flex } from 'rimble-ui'
import { useStoreState } from 'easy-peasy'
import { Layout } from './components/Layout'
import { Channel } from './components/Channel'
import { Filters } from './components/Filters'
// import logo from './ethereumLogo.png'
// import { addresses, abis } from '@project/contracts'
// import { ethers } from 'ethers'
import './App.css'

// async function readOnchainBalance() {
//   // Should replace with the end-user wallet, e.g. Metamask
//   const defaultProvider = ethers.getDefaultProvider()
//   // Create an instance of ethers.Contract
//   // Read more about ethers.js on https://docs.ethers.io/ethers.js/html/api-contract.html
//   const ceaErc20 = new ethers.Contract(
//     addresses.ceaErc20,
//     abis.erc20,
//     defaultProvider
//   )
//   // A pre-defined address that owns some CEAERC20 tokens
//   const tokenBalance = await ceaErc20.balanceOf(
//     '0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C'
//   )
//   console.log({ tokenBalance: tokenBalance.toString() })
// }

export default () => {
  const channels = useStoreState(state => state.channels.data)

  return (
    <div className='App'>
      <Layout>
        <Filters />
        <Flex flexWrap='wrap' justifyContent='space-around'>
          {channels ? (
            channels.map((channel, index) => (
              <Channel key={index} {...channel} />
            ))
          ) : (
            <> </>
          )}
        </Flex>
      </Layout>
    </div>
  )
}
