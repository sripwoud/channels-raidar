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
        my={2}>
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
    </>
  )
}
