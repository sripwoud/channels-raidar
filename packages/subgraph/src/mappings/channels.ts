import { Channel } from '../types/schema'
import {
  ChannelOpened,
  ChannelClosed,
  ChannelSettled
} from '../types/TokenNetwork/tttNetwork'

export function handleChannelOpened(event: ChannelOpened): void {
  let id = event.params.channel_identifier.toHex()
  let channel = new Channel(id)
  channel.tx = event.transaction.hash
  channel.openedAtBlock = event.block.number
  channel.status = 'Open'
  channel.participant1 = event.params.participant1
  channel.participant2 = event.params.participant2
  channel.save()
}

export function handleChannelClosed(event: ChannelClosed): void {
  let id = event.params.channel_identifier.toHex()
  let channel = Channel.load(id)
  channel.tx = event.transaction.hash
  channel.closedBy = event.params.closing_participant
  channel.closingNonce = event.params.nonce
  channel.status = 'Closed'
  channel.save()
}

export function handleChannelSettled(event: ChannelSettled): void {
  let id = event.params.channel_identifier.toHex()
  let channel = Channel.load(id)
  channel.tx = event.transaction.hash
  channel.settled_amount1 = event.params.participant1_amount
  channel.settled_amount2 = event.params.participant2_amount
  channel.status = 'Settled'
  channel.save()
}
