import { gql } from 'apollo-boost'

export const queries = {
  all: gql`
    {
      channels(orderBy: openedAtBlock, orderDirection: desc) {
        tx
        status
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
      }
    }
  `
}
