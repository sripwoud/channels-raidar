import React from 'react'
import { render, screen } from '@testing-library/react'
import { Channel } from '../components/Channel'
import { ChannelFilter } from '../lib/constants'
import { shortenAddress, friendlyAmountFormat } from '../helpers'

const mockOpenChannel = {
  tx: '0x115659c3bb28e6a47ed357148afee908e9e289f873d0d98b282f5ce01d2fa23c',
  status: ChannelFilter.open,
  participants: [
    '0xc1154a6e93623614ecc7f2cf060186bdbb92cd09',
    '0x4944d75bfa7970c8409b973d54543f45b15380ea'
  ]
}

const mockClosedChannel = {
  tx: '0x115659c3bb28e6a47ed357148afee908e9e289f873d0d98b282f5ce01d2fa23c',
  status: ChannelFilter.open,
  participants: [
    '0xc1154a6e93623614ecc7f2cf060186bdbb92cd09',
    '0x4944d75bfa7970c8409b973d54543f45b15380ea'
  ],
  closedBy: '0xc1154a6e93623614ecc7f2cf060186bdbb92cd09'
}

const mockSettledChannel = {
  tx: '0x115659c3bb28e6a47ed357148afee908e9e289f873d0d98b282f5ce01d2fa23c',
  status: ChannelFilter.open,
  participants: [
    '0xc1154a6e93623614ecc7f2cf060186bdbb92cd09',
    '0x4944d75bfa7970c8409b973d54543f45b15380ea'
  ],
  closedBy: '0xc1154a6e93623614ecc7f2cf060186bdbb92cd09',
  settled_amounts: [500000000000000000, 600000000000000000]
}
test('renders without crashing', () => {
  let pass = true
  try {
    render(<Channel {...mockOpenChannel} />)
  } catch {
    pass = false
  }
  expect(pass).toBeTruthy()
})

test('open channel card: contains 3 etherscan links that match the channel data', () => {
  const { getAllByRole, getByText } = render(<Channel {...mockOpenChannel} />)
  mockOpenChannel.participants.forEach(participant => {
    expect(getByText(shortenAddress(participant))).toBeInTheDocument()
  })

  const links = getAllByRole('link')
  ;[
    mockOpenChannel.tx,
    mockOpenChannel.participants[0],
    mockOpenChannel.participants[1]
  ].forEach((link, index) => {
    const href = links[index].getAttribute('href')
    expect(href).toContain(link)
    expect(href).toContain('etherscan')
  })
})

test('closed channel card: contains a "x" to indicate who closed it', () => {
  const { getByText } = render(<Channel {...mockClosedChannel} />)
  expect(getByText('x')).toBeInTheDocument()
})

test('settled channel card: displays 2 settled amounts', () => {
  const { getByText } = render(<Channel {...mockSettledChannel} />)
  mockSettledChannel.settled_amounts.forEach(amount => {
    expect(getByText(friendlyAmountFormat(amount))).toBeInTheDocument()
  })
})
