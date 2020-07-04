import React, { useEffect, useState } from 'react'
import { Field, Select, Text } from 'rimble-ui'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useQuery } from '@apollo/react-hooks'
import { useWeb3React } from '@web3-react/core'
import { capitalize } from '../helpers'
import { queries } from '../queries'
import { ChannelFilter, AddressFilter } from '../constants'

export const Form = () => {
  const [addressFilter, setAddressFilter] = useState('all')
  const [channelFilter, setChannelFilter] = useState('all')
  const { account } = useWeb3React()
  const channels = useStoreState(state => state.channels.data)
  const { loading, error, data } = useQuery(
    queries(addressFilter, channelFilter)
  )

  const updateChannels = useStoreActions(actions => actions.channels.update)

  useEffect(() => {
    if (!loading && !error && data?.channels) {
      updateChannels(data.channels)
    }
  }, [loading, error, data, updateChannels])

  return (
    <>
      <Field label='Addresses' mr={4}>
        <Select
          required
          options={[{ value: 'todo', label: 'todo' }]}
          // options={[
          //   { value: AddressFilter.all, label: 'All' },
          //   { value: account, label: 'Only yours' }
          // ]}
          // onChange={event => {
          //   setAddressFilter(event.target.value)
          // }}
        />
      </Field>
      <Field label='Channels'>
        <Select
          required
          options={Object.keys(ChannelFilter).map(channelFilter => {
            return { value: channelFilter, label: capitalize(channelFilter) }
          })}
          onChange={event => setChannelFilter(event.target.value)}
        />
      </Field>
      <Text color='white' fontWeight='bold' mb={2}>
        {channels.length}
      </Text>
    </>
  )
}
