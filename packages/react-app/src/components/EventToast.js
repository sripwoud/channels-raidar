import React, { useState } from 'react'
import { ToastMessage } from 'rimble-ui'
import { useContract } from '../hooks'

export const EventToast = () => {
  const [event, setEvent] = useState('')
  const [show, setShow] = useState(false)
  const contract = useContract()

  if (contract) {
    ;['ChannelOpened', 'ChannelClosed', 'ChannelSettled'].forEach(event => {
      contract.on(event, () => {
        setEvent(event)
        setShow(true)
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      })
    })
  }

  return (
    <>
      {show ? (
        <ToastMessage.Processing
          message={`Event ${event} detected`}
          secondaryMessage='Page will refresh in 3 seconds...'
        />
      ) : (
        <></>
      )}
    </>
  )
}
