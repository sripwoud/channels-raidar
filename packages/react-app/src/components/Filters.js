import React, { useEffect } from 'react'
import { Button } from 'rimble-ui'
import { useStoreActions } from 'easy-peasy'
import { useQuery } from '@apollo/react-hooks'
import { queries } from '../queries'

export const Filters = () => {
  const { loading, error, data } = useQuery(queries.all)

  const updateChannels = useStoreActions(actions => actions.channels.update)
  useEffect(() => {
    if (!loading && !error && data?.channels) {
      updateChannels(data.channels)
    }
  }, [loading, error, data])
  return <Button>All</Button>
}
