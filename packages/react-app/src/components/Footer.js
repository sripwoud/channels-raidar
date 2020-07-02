import React from 'react'
import { Flex, Link as LinkRimble } from 'rimble-ui'
// import GitHubIcon from '@material-ui/icons/GitHub'

export const Footer = () => (
  <Flex
    alignItems='center'
    justifyContent='center'
    flexDirection='column'
    mb={3}>
    <p>
      Made by
      <LinkRimble href='https://twitter.com/r1oga' target='__blank' px={2}>
        @r1oga
      </LinkRimble>
    </p>
    <LinkRimble
      href='hhttps://github.com/r1oga/channels-raidar'
      target='__blank'
      px={2}>
      GitHub
    </LinkRimble>
  </Flex>
)
