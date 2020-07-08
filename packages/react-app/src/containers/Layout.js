import React from 'react'
import { useWeb3React } from '@web3-react/core'
import ConnectionBanner from '@rimble/connection-banner'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Form } from '../components/Form'

export const Layout = props => {
  const context = useWeb3React()
  const { chainId } = context
  return (
    <>
      <Header />
      <ConnectionBanner currentNetwork={chainId} requiredNetwork={5} />
      <Form />
      {props.children}
      <Footer />
    </>
  )
}
