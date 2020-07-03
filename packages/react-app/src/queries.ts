import { gql } from 'apollo-boost'
import { ChannelStatus, AddressesFilters } from './constants'

export const queries = {
  all: {
    all: {
      queryString: gql`
        {
          channels(orderBy: openedAtBlock, orderDirection: desc) {
            tx
            status
            participants
            closedBy
            settled_amounts
          }
        }
      `,
      icon: 'SelectAll'
    },
    [ChannelStatus.open]: {
      queryString: gql`
        {
          channels(
            where: { status: open }
            orderBy: openedAtBlock
            orderDirection: desc
          ) {
            status
            tx
            participants
          }
        }
      `,
      icon: 'LockOpen'
    },
    [ChannelStatus.closed]: {
      queryString: gql`
        {
          channels(
            where: { status: closed }
            orderBy: openedAtBlock
            orderDirection: desc
          ) {
            status
            tx
            participants
            closedBy
          }
        }
      `,
      icon: 'LockOutline'
    },
    [ChannelStatus.settled]: {
      queryString: gql`
        {
          channels(
            where: { status: settled }
            orderBy: openedAtBlock
            orderDirection: desc
          ) {
            status
            tx
            participants
            closedBy
            settled_amounts
          }
        }
      `,
      icon: 'Gavel'
    }
  },
  one: {
    all: {
      queryString: gql`
        {
          channels(orderBy: openedAtBlock, orderDirection: desc) {
            tx
            status
            participant1
            participant2
            closedBy
            settled_amount1
            settled_amount2
          }
        }
      `,
      icon: 'SelectAll'
    },
    [ChannelStatus.open]: {
      queryString: gql`
        {
          channels(
            where: { status: open }
            orderBy: openedAtBlock
            orderDirection: desc
          ) {
            status
            tx
            participant1
            participant2
          }
        }
      `,
      icon: 'LockOpen'
    },
    [ChannelStatus.closed]: {
      queryString: gql`
        {
          channels(
            where: { status: closed }
            orderBy: openedAtBlock
            orderDirection: desc
          ) {
            status
            tx
            participant1
            participant2
            closedBy
          }
        }
      `,
      icon: 'LockOutline'
    },
    [ChannelStatus.settled]: {
      queryString: gql`
        {
          channels(
            where: { status: settled }
            orderBy: openedAtBlock
            orderDirection: desc
          ) {
            status
            tx
            participant1
            participant2
            closedBy
            settled_amount1
            settled_amount2
          }
        }
      `,
      icon: 'Gavel'
    }
  }
}
