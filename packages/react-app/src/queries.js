import { gql } from 'apollo-boost'

export const queries = {
  all: gql`
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
  open: gql`
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
  closed: gql`
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
  settled: gql`
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
        settled_amount1
        settled_amount2
      }
    }
  `
}
