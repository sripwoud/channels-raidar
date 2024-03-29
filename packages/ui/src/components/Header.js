import React from 'react'
import { Link, Text, Heading, Image } from 'rimble-ui'

export const Header = props => {
  return (
    <>
      <Heading as='h1' my={2} color='#fff' fontSize={[1, 3, 4]}>
        <Image
          className='raiden-logo'
          alt='raiden logo'
          src='rdn.png'
          mr={3}
          height={['15', '20', '30']}
        />
        CHANNELS RAIDAR
        <Image
          className='raiden-logo'
          alt='raiden logo'
          src='rdn.png'
          ml={3}
          height={['15', '20', '30']}
        />
      </Heading>
      <Text fontSize={['11px', '13px', '15px']} color='white' mb={[0, 2, 3]}>
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
    </>
  )
}
