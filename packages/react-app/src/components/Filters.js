import React, { useEffect } from 'react'
import { Button, Flex } from 'rimble-ui'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useQuery } from '@apollo/react-hooks'
import { queries } from '../queries'

export const Filters = () => {
  const query = useStoreState(state => state.query.value)
  const { loading, error, data } = useQuery(query)

  const updateChannels = useStoreActions(actions => actions.channels.update)
  const updateQuery = useStoreActions(actions => actions.query.update)
  useEffect(() => {
    if (!loading && !error && data?.channels) {
      updateChannels(data.channels)
    }
  }, [loading, error, data])

  return (
    <Flex justifyContent='space-around' mb={4}>
      {Object.keys(queries).map((queryName, index) => (
        <Button key={index} onClick={() => updateQuery(queries[queryName])}>
          {queryName}
        </Button>
      ))}
    </Flex>
  )
}
