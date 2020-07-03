import React from 'react'
import { Card, Link, Icon, Flex, Text, Table } from 'rimble-ui'
import { InsertLink as LinkIcon } from '@rimble/icons'
import { ChannelFilter } from '../constants'
import { capitalize } from '../helpers'

const channelsMapping = {
  [ChannelFilter.open]: { color: '#6D8CC8', icon: 'LockOpen' },
  [ChannelFilter.closed]: { color: '#5784DE', icon: 'LockOutline' },
  [ChannelFilter.settled]: { color: '#131C5F', icon: 'Gavel' }
}

export const Channel = ({
  tx,
  status,
  participants,
  closedBy,
  settled_amounts
}) => {
  return (
    <Card
      bg={channelsMapping[status].color}
      color='white'
      fontSize={[1, 2, 3]}
      flex='1'>
      <Flex
        flexDirection='row'
        flexWrap='nowrap'
        justifyContent='space-around'
        mb={2}>
        <Icon name={channelsMapping[status].icon} size='40' />
        <Text fontSize={[2, 3, 4]} fontWeight='bold'>
          {capitalize(status)}
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
            <th>Address</th>
            <th>Settled Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{closedBy === participants[0] ? '>' : ''}</td>
            <td>{participants[0]}</td>
            <td>{settled_amounts ? settled_amounts[0] : ''}</td>
          </tr>
          <tr>
            <td>{closedBy === participants[1] ? '>' : ''}</td>
            <td>{participants[1]}</td>
            <td>{settled_amounts ? settled_amounts[1] : ''}</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  )
}
