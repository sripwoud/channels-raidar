import React from 'react'

export const Scroll = props => {
  return (
    <div
      style={{
        overflowY: 'scroll',
        border: '1px white solid',
        height: '68.5vh'
      }}>
      {props.children}
    </div>
  )
}
