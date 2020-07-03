import { gql } from 'apollo-boost'
import { ChannelStatus } from './types'

export const queries = {
  All: {
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
          where: { status: Open }
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
          where: { status: Closed }
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
          where: { status: Settled }
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
