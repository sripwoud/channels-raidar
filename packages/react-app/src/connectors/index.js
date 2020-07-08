import { InjectedConnector } from '@web3-react/injected-connector'

export const injected = new InjectedConnector({
  /* Need to include all chains that can be selected in metamask
    in supportedChainIds so that the connection banner
    can display warning messages accordingly
  */
  supportedChainIds: [1, 3, 4, 42, 5]
})

/* TODO
  Add further connectors
  walletconnect
  fortmatic
  portis
*/
