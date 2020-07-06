import React, { useState } from 'react'
import { ToastMessage } from 'rimble-ui'
import { useContract } from '../hooks'

export const EventToast = () => {
  const [event, setEvent] = useState('')
  const [show, setShow] = useState(false)
  const [toastState, setToastState] = useState('loading')
  const contract = useContract()

  if (contract) {
    ;['ChannelOpened', 'ChannelClosed', 'ChannelSettled'].forEach(event => {
      contract.on(event, () => {
        console.log(`${event} event detected`)
        setEvent(event)
        setToastState('loading')
        setShow(true)
      })
    })
  }

  const renderToast = toastState => {
    switch (toastState) {
      case 'loading':
        return (
          <ToastMessage.Processing
            message={`Event ${event} detected`}
            secondaryMessage='Waiting for confirmation'
          />
        )

      case 'success':
        return <ToastMessage.Success message={`Event ${event} confirmed`} />

      default:
        return <ToastMessage.Failure message='Error' />
    }
  }
  return <>{show ? renderToast(toastState) : <></>}</>
}
