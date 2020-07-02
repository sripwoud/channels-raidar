import React from 'react'
import { Link, Text } from 'rimble-ui'

export const Header = props => {
  return (
    <>
      <h1>CHANNELS RAIDAR</h1>
      <Text mb={4}>
        Monitoring of
        <Link px={2} href='https://raiden.network/' target='_blank'>
          Raiden Network
        </Link>
        Payment Channels
      </Text>
    </>
  )
}
