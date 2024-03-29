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
  channel.status = 'open'
  channel.participants = [event.params.participant1, event.params.participant2]
  channel.save()
}

export function handleChannelClosed(event: ChannelClosed): void {
  let id = event.params.channel_identifier.toHex()
  let channel = Channel.load(id)
  channel.tx = event.transaction.hash
  channel.closedBy = event.params.closing_participant
  channel.closingNonce = event.params.nonce
  channel.status = 'closed'
  channel.save()
}

export function handleChannelSettled(event: ChannelSettled): void {
  let id = event.params.channel_identifier.toHex()
  let channel = Channel.load(id)
  channel.tx = event.transaction.hash
  channel.settled_amounts = [
    event.params.participant1_amount,
    event.params.participant2_amount
  ]
  channel.status = 'settled'
  channel.save()
}
