export enum ChannelFilter {
  all = 'all',
  open = 'open',
  closed = 'closed',
  settled = 'settled'
}

export enum AddressFilter {
  all = 'all',
  one = 'one'
}

export const channelsIcons = {
  [ChannelFilter.open]: { icon: 'LockOpen' },
  [ChannelFilter.closed]: { icon: 'LockOutline' },
  [ChannelFilter.settled]: { icon: 'Gavel' }
}
