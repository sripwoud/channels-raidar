import { gql } from 'apollo-boost'
import { ChannelFilter } from './constants'

const queriesAll = {
  all: gql`
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
  [ChannelFilter.open]: gql`
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
  [ChannelFilter.closed]: gql`
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
  [ChannelFilter.settled]: gql`
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
  `
}

const queriesOne = (addressFilter: string) => {
  return {
    all: gql`
      {
        channels(
          where: { participants_contains: ["${addressFilter}"] }
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
    [ChannelFilter.open]: gql`
      {
        channels(
          where: {
            status: open,
            participants_contains: ["${addressFilter}"]
          }
          orderBy: openedAtBlock
          orderDirection: desc
        ) {
          status
          tx
          participants
        }
      }
    `,
    [ChannelFilter.closed]: gql`
      {
        channels(
          where: {
            status: closed
            participants_contains: ["${addressFilter}"]
          }
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
    [ChannelFilter.settled]: gql`
      {
        channels(
          where: {
            status: settled
            participants_contains: ["${addressFilter}"]
          }
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
    `
  }
}

export const queries = (
  addressFilter: string,
  channelFilter: ChannelFilter
) => {
  if (addressFilter === 'all') return queriesAll[channelFilter]
  return queriesOne(addressFilter)[channelFilter]
}
