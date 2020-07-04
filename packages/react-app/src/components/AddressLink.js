import React from 'react'
import { Link } from 'rimble-ui'
import { shortenAddress, getEtherscanLink } from '../helpers'

export const AddressLink = ({ address, hasClosed }) => {
  return (
    <>
      <span>
        {hasClosed ? 'x ' : <>&nbsp;&nbsp;</>}
        <Link
          color='white'
          fontSize={['9px', '10px', '12px']}
          href={getEtherscanLink(address, 'address')}
          target='__blank'>
          {shortenAddress(address)}
        </Link>
      </span>
    </>
  )
}
