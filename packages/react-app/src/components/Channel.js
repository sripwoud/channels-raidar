import React from 'react'
import { Card, Link, Icon, Flex, Text, Table } from 'rimble-ui'
// import { InsertLink } from '@rimble/icons'
import { ChannelFilter, channelsIcons } from '../lib/constants'
import { capitalize, friendlyAmountFormat, getEtherscanLink } from '../helpers'
import { AddressLink } from './AddressLink'

export const Channel = ({
  tx,
  status,
  participants,
  closedBy,
  settled_amounts
}) => {
  return (
    <Card
      borderRadius='4px'
      maxWidth='820px'
      m={2}
      p={0}
      bg={ChannelFilter[status]}
      color='white'
      flex='1'>
      <Flex
        flexDirection='row'
        flexWrap='nowrap'
        justifyContent='space-around'
        my={2}>
        <Icon name={channelsIcons[status].icon} size='20' />
        <Text fontSize={['11px', '12px', '13px']} fontWeight='bold'>
          {capitalize(status)}
        </Text>
        <Link href={getEtherscanLink(tx, 'event')} target='_blank'>
          <img src='link.png' height='18px' alt='link logo' />
        </Link>
      </Flex>
      <Table color='white' boxShadow='none' border='none'>
        <thead style={{ fontSize: '10px' }}>
          <tr>
            <th>Address</th>
            <th>Settled Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <AddressLink
                address={participants[0]}
                hasClosed={closedBy && closedBy === participants[0]}
              />
            </td>
            <td>
              <Text fontSize={['9px', '10px', '12px']}>
                {settled_amounts
                  ? friendlyAmountFormat(settled_amounts[0])
                  : ''}
              </Text>
            </td>
          </tr>
          <tr>
            <td>
              <AddressLink
                address={participants[1]}
                hasClosed={closedBy && closedBy === participants[1]}
              />
            </td>
            <td>
              <Text fontSize={['9px', '10px', '12px']}>
                {settled_amounts
                  ? friendlyAmountFormat(settled_amounts[1])
                  : ''}
              </Text>
            </td>
          </tr>
        </tbody>
      </Table>
    </Card>
  )
}
