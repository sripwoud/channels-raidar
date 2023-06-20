import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import * as ethers from 'ethers'
/* master branch is used for deployment to vercel
  only react-app package is deployed to vercel
  so can't import contracts package
  need to store a copy of it in react-package instead
*/
// import { addresses, abis } from '@project/contracts'
import { addresses, abis } from '../contracts'
import { injected } from '../connectors'

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

// if access to injected provided  already granted, "eagerly" connect
export function useEagerConnect() {
  const { activate, active } = useWeb3React()
  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then(isAuthorized => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        if (window.ethereum) {
          activate(injected, undefined, true).catch(() => {
            setTried(true)
          })
        } else {
          setTried(true)
        }
      }
    })
  }, [activate]) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true)
    }
  }, [active])

  return tried
}

/*
  when there's no account connected, react to login
  logs in/out after checking what network we are on
*/
export function useInactiveListener(supress = false) {
  const { activate, active, error } = useWeb3React()

  useEffect(() => {
    const { ethereum } = window

    if (ethereum && ethereum.on && !active && !error) {
      const handleChainChanged = chainId => {
        activate(injected)
      }

      const handleAccountsChanged = accounts => {
        if (accounts.length > 0) {
          activate(injected)
        }
      }

      const handleNetworkChanged = networkId => {
        activate(injected)
      }

      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }

    return () => {}
  }, [active, error, activate])
}
