import React from 'react'
import { Card, Link } from 'rimble-ui'
import { InsertLink as LinkIcon } from '@rimble/icons'

const colorCodes = {
  open: '#6D8CC8',
  closed: '#5784DE',
  settled: '#131C5F'
}

export const Channel = ({
  tx,
  status,
  participant1,
  participant2,
  closedBy,
  settled_amount1,
  settled_amount2
}) => {
  return (
    <Card bg={colorCodes[status]} color='white'>
      <p>{status}</p>
      <p>1st Participant: {participant1}</p>
      <p>2nd Participant: {participant2}</p>
      {status === 'closed' ? <p>Closed by: {closedBy}</p> : <></>}
      {status === 'settled' ? (
        <>
          <p>Settled Amout 1st participant: {settled_amount1}</p>
          <p>Settled Amount 2nd participant: {settled_amount2}</p>
        </>
      ) : (
        <></>
      )}
      <Link
        href={`https://goerli.etherscan.io/tx/${tx}#eventlog`}
        target='_blank'>
        <LinkIcon color='white' />
      </Link>
    </Card>
  )
}
