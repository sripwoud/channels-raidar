import React, { useEffect, useState } from 'react'
import { Field, Flex, Box } from 'rimble-ui'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useQuery } from '@apollo/react-hooks'
import { useWeb3React } from '@web3-react/core'
import { capitalize } from '../helpers'
import { queries } from '../queries'
import { ChannelFilter } from '../constants'

export const Form = () => {
  const { account } = useWeb3React()
  const [channelFilter, setChannelFilter] = useState('all')
  const [address, setAddress] = useState('all')
  const [showCustomAddressInput, setShowCustomAddressInput] = useState(false)
  const channels = useStoreState(state => state.channels.data)
  const { loading, error, data } = useQuery(queries(address, channelFilter))
  const updateChannels = useStoreActions(actions => actions.channels.update)

  useEffect(() => {
    if (!loading && !error && data?.channels) {
      updateChannels(data.channels)
    }
  }, [loading, error, data, updateChannels])

  return (
    <Flex flexWrap='wrap' justifyContent='center'>
      <Box
        color='white'
        fontSize={['9px', '10px', '12px']}
        width={[1, 1 / 2, 1 / 3]}>
        <Field label='Address' color='white' fontSize='inherit'>
          <select
            required
            onChange={event => {
              setShowCustomAddressInput(false)
              if (event.target.value === 'custom') {
                setShowCustomAddressInput(true)
              } else if (event.target.value === 'mine') {
                setAddress(account)
              } else {
                setAddress(event.target.value)
              }
            }}>
            <option value='all'>All</option>
            <option value='mine'>Mine</option>
            <option value='custom'>Custom</option>
          </select>
        </Field>
        {showCustomAddressInput ? (
          <Field ml={2} mb={1}>
            <input
              required
              type='text'
              placeholder='0x...'
              style={{ marginTop: '5px' }}
              onChange={event => {
                setAddress(event.target.value)
              }}
            />
          </Field>
        ) : (
          <></>
        )}
      </Box>
      <Box width={[1, 1 / 2, 1 / 3]}>
        <Field
          label='Channels'
          color='white'
          fontSize={['9px', '10px', '12px']}>
          <select
            required
            onChange={event => setChannelFilter(event.target.value)}>
            {Object.keys(ChannelFilter).map((channelFilter, index) => {
              return (
                <option key={index} value={channelFilter}>
                  {capitalize(channelFilter)}
                </option>
              )
            })}
          </select>
        </Field>
      </Box>
      <Flex
        width={[1, 1 / 2, 1 / 3]}
        flexWrap='wrap'
        flexDirection='row'
        justifyContent='space-between'
        color='white'
        mb={2}
        fontSize={['9px', '10px', '12px']}>
        <Box width={[1 / 3, 1, 1]}>Count = {channels.length}</Box>
        <Box width={[1 / 3, 1, 1]}>x = closed by</Box>
        <Box width={[1 / 3, 1, 1]}>amounts x 10¹⁸</Box>
      </Flex>
    </Flex>
  )
}
