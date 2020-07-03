import React from 'react'
import { Card, Link, Icon, Flex, Text, Table } from 'rimble-ui'
import { InsertLink as LinkIcon } from '@rimble/icons'
import { queries } from '../queries'
import { ChannelStatus } from '../types'

const colorCodes = {
  [ChannelStatus.open]: '#6D8CC8',
  [ChannelStatus.closed]: '#5784DE',
  [ChannelStatus.settled]: '#131C5F'
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
    <Card bg={colorCodes[status]} color='white' fontSize={[1, 2, 3]} flex='1'>
      <Flex
        flexDirection='row'
        flexWrap='nowrap'
        justifyContent='space-around'
        mb={2}>
        <Icon name={queries[status].icon} size='40' />
        <Text fontSize={[2, 3, 4]} fontWeight='bold'>
          {status}
        </Text>
        <Link
          href={`https://goerli.etherscan.io/tx/${tx}#eventlog`}
          target='_blank'>
          <LinkIcon color='white' size='40' />
        </Link>
      </Flex>
      <Table color='white'>
        <thead>
          <tr>
            <th>Closed by</th>
            <th>#</th>
            <th>Address</th>
            <th>Settled Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{closedBy === participant1 ? 'X' : ''}</td>
            <td>1</td>
            <td>{participant1}</td>
            <td>{settled_amount1}</td>
          </tr>
          <tr>
            <td>{closedBy === participant2 ? 'X' : ''}</td>
            <td>2</td>
            <td>{participant2}</td>
            <td>{settled_amount2}</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  )
}
