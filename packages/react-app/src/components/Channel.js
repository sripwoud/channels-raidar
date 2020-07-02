import React from 'react'
import { Card, Link } from 'rimble-ui'
import { InsertLink as LinkIcon } from '@rimble/icons'

const colorCodes = {
  open: '#6D8CC8',
  closed: '#5784DE',
  settled: '#131C5F'
}

export const Channel = ({ tx, status }) => {
  return (
    <Card bg={colorCodes[status]} color='white'>
      <p>{status}</p>
      <Link
        href={`https://goerli.etherscan.io/tx/${tx}#eventlog`}
        target='_blank'>
        <LinkIcon color='white' />
      </Link>
    </Card>
  )
}
