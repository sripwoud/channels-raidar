import React from 'react'
import { Card } from 'rimble-ui'

export const Channel = ({ id, status }) => {
  return (
    <Card>
      <p>ID: {id}</p>
      <p>Status: {status}</p>
    </Card>
  )
}
