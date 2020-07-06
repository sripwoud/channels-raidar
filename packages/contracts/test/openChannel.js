const ethers = require('ethers')
const { provider } = require('./signer')
const tokenNetworkAbi = require('../src/abis/TokenNetwork.json')
const instance = require('./prompt.js')

const signer = provider.getSigner(1)
;(async () => {
  try {
    const accounts = await provider.listAccounts()

    // Load Deployed TokenNetwork contract
    console.log('Load deployed Token Network contract')
    const contract = new ethers.Contract(instance, tokenNetworkAbi.abi, signer)

    // Open a Channel
    console.log('Create listener to ChannelOpened')

    const tx = await contract.openChannel(
      accounts[1],
      accounts[2],
      1 // settle_timeout (num blocks)
    )
    console.log('Opened a new channel, waiting for next block')

    const receipt = await tx.wait(1)
    const {
      args: { participant1, participant2 }
    } = receipt.events.pop()
    console.log(
      'Confirmation',
      `Channel opened between ${participant1} and ${participant2}`
    )

    contract.once('ChannelOpened', (...args) => {
      // callback takes as params (eventProp1, eventProp2, ..., argObj)
      /* argsObj.arg is like
      {
        1: val1
        2: val2
        ...
        prop1: val1
        prop2: val2
      }
      */
      console.log('Channel Opened event:')
      const argsObj = args[4]
      const eventDataKeys = Object.keys(argsObj.args).slice(4, 8)
      eventDataKeys.forEach(key => {
        console.log(key, argsObj.args[key])
      })
    })
  } catch (error) {
    console.error(error)
  }
})()
