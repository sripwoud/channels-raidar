import React from 'react'
import { Link, Text, Box, Heading, Image } from 'rimble-ui'
import { useWeb3React } from '@web3-react/core'
import ConnectionBanner from '@rimble/connection-banner'

export const Header = props => {
  const context = useWeb3React()
  const { chainId } = context

  return (
    <>
      <Box
        color='#fff'
        fontSize={['10px', '12px', '14px']}
        alignItems='center'
        justifyContent='center'
        BoxDirection='column'
        mt={3}>
        Made by
        <Link
          fontSize='inherit'
          href='https://twitter.com/r1oga'
          target='__blank'
          px={2}>
          @r1oga
        </Link>
        -
        <Link
          fontSize='inherit'
          href='https://github.com/r1oga/channels-raidar'
          target='__blank'
          px={2}>
          GitHub
        </Link>
      </Box>
      <Heading as='h1' my={2} color='#fff' fontSize={[1, 3, 4]}>
        <Image
          alt='raiden logo'
          src='rdn.png'
          mr={3}
          height={['15', '20', '30']}
        />
        CHANNELS RAIDAR
        <Image
          alt='raiden logo'
          src='rdn.png'
          ml={3}
          height={['15', '20', '30']}
        />
      </Heading>
      <Text fontSize={['11px', '13px', '15px']} color='white' mb={[1, 2, 3]}>
        Monitoring of
        <Link
          fontSize='inherit'
          px={2}
          href='https://raiden.network/'
          target='_blank'>
          Raiden Network
        </Link>
        Payment Channels
      </Text>
      <ConnectionBanner currentNetwork={chainId} requiredNetwork={5} />
    </>
  )
}
