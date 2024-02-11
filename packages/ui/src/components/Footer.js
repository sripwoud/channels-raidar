import React from 'react'
import { Box, Link } from 'rimble-ui'

export const Footer = () => {
  return (
    <>
      <Box
        color='#fff'
        fontSize={['10px', '12px', '14px']}
        alignItems='center'
        justifyContent='center'
        BoxDirection='column'
        maxHeight='15px'
        my={2}>
        Made by
        <Link
          fontSize='inherit'
          href='https://sripwoud.xyz'
          target='__blank'
          px={2}>
          sripwoud
        </Link>
        -
        <Link
          fontSize='inherit'
          href='https://github.com/sripwoud/channels-raidar'
          target='__blank'
          px={2}>
          GitHub
        </Link>
      </Box>
    </>
  )
}
