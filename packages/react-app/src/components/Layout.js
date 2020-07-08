import React from 'react'
import { Box } from 'rimble-ui'
import { Header } from './Header'
import { Footer } from './Footer'
import { Form } from './Form'

export const Layout = props => {
  return (
    <>
      <Box maxHeight='200px'>
        <Header />
        <Form />
      </Box>
      {props.children}
      <Footer />
    </>
  )
}
