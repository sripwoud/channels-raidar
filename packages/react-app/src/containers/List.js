import React from 'react'

export const List = Component => ({ list }) => {
  return (
    <>
      {list.map((item, index) => (
        <Component key={index} {...item} />
      ))}
    </>
  )
}
