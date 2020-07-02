import { gql } from 'apollo-boost'

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
  Open: {
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
  Closed: {
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
  Settled: {
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
          settled_amount1
          settled_amount2
        }
      }
    `,
    icon: 'Gavel'
  }
}
