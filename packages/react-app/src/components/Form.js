import React, { useEffect, useState } from 'react'
import { Field, Select } from 'rimble-ui'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useQuery } from '@apollo/react-hooks'
import { capitalize } from '../helpers'

import { queries } from '../queries'
import { ChannelStatus, AddressesFilters } from '../constants'

export const Form = () => {
  const query = useStoreState(state => state.query.value)
  const channels = useStoreState(state => state.channels.data)
  const { loading, error, data } = useQuery(query)

  const [addressFilter, setAddressFilter] = useState('all')
  const [channelFilter, setChannelFilter] = useState('all')

  const updateChannels = useStoreActions(actions => actions.channels.update)
  const updateQuery = useStoreActions(actions => actions.query.update)
  useEffect(() => {
    if (!loading && !error && data?.channels) {
      updateChannels(data.channels)
    }
  }, [loading, error, data, updateChannels])

  return (
    <>
      <Field label='Which addresse(s)?'>
        <Select
          required
          options={[
            { value: AddressesFilters.all, label: 'All' },
            { value: AddressesFilters.one, label: 'Only yours' }
          ]}
          onChange={event => setChannelFilter(event.target.value)}
        />
      </Field>
      <Field label='Which channel(s)?'>
        <Select
          required
          options={Object.keys(queries.all).map(key => {
            return { value: key, label: capitalize(key) }
          })}
          onChange={event => setAddressFilter(event.target.value)}
        />
      </Field>
      <p>{channels.length}</p>
    </>
  )
}
