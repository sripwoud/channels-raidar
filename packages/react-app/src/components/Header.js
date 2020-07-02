import React from 'react'
import { Link, Text, Box } from 'rimble-ui'

export const Header = props => {
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
    </>
  )
}
