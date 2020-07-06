import { useState, useEffect } from 'react'
/* master branch is used for deployment to vercel
  only react-app package is deployed to vercel
  so can't import contracts package
  need to store a copy of it in react-package instead
*/
// import { addresses, abis } from '@project/contracts'
import { addresses, abis } from '../contracts'
import * as ethers from 'ethers'
import { useWeb3React } from '@web3-react/core'

export function useContract() {
  const context = useWeb3React()
  const { library } = context

  const [contract, setContract] = useState(null)
  useEffect(() => {
    if (library && library.provider) {
      // get signer (prototype methods) for loaded metamask account
      // see: https://docs.ethers.io/ethers.js/html/api-providers.html#jsonrpcprovider
      const signer = library.getSigner(0)

      // load contractWithSigner
      const contractWithSigner = new ethers.Contract(
        addresses.tttNetwork,
        abis.tttNetwork,
        signer
      )
      setContract(contractWithSigner)
    }
  }, [library])

  return contract
}
