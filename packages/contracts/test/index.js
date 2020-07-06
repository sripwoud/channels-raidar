const ethers = require('ethers')
const { provider } = require('./signer')
const tokenNetworkAbi = require('../src/abis/TokenNetwork.json')
const erc20Abi = require('../src/abis/CustomToken.json')
const secretRegistryAbi = require('../src/abis/SecretRegistry.json')

const signer = provider.getSigner()
;(async () => {
  try {
    const accounts = await provider.listAccounts()

    // Deploy ERC20 token contract
    const factoryErc20 = new ethers.ContractFactory(
      erc20Abi.abi,
      erc20Abi.bytecode,
      signer
    )
    console.log('Deploying ERC20 contract...')
    const erc20Contract = await factoryErc20.deploy()
    erc20Contract.deployTransaction.wait()
    console.log(`ERC20 contract deployed at: ${erc20Contract.address}`)

    const balance = await erc20Contract.balanceOf(accounts[0])
    console.log(`Account 0 has: ${balance.toString()} tokens`)
    console.log()

    // deploy SecretRegistry
    const factorySecretRegistry = new ethers.ContractFactory(
      secretRegistryAbi.abi,
      secretRegistryAbi.bytecode,
      signer
    )
    console.log('Deploying SecretRegistry contract...')
    const secretRegistryContract = await factorySecretRegistry.deploy()
    secretRegistryContract.deployTransaction.wait()
    console.log(
      `SecretRegistry contract deployed at: ${secretRegistryContract.address}`
    )
    console.log()

    // deploy Token Network
    const factoryTokenNetwork = new ethers.ContractFactory(
      tokenNetworkAbi.abi,
      tokenNetworkAbi.bytecode,
      signer
    )
    console.log('Deploying TokenNetwork contract...')
    const tokenNetworkContract = await factoryTokenNetwork.deploy(
      erc20Contract.address,
      secretRegistryContract.address,
      5, // network id
      1, // min settlement timeout (in blocks number)
      2, // max settlement timeout
      accounts[0], // deprecation executor
      100, // participant deposit limit
      200 // token network deposit limit
    )
    tokenNetworkContract.deployTransaction.wait()
    console.log(
      `TokenNetwork contract deployed at: ${tokenNetworkContract.address}`
    )
    console.log()

    // Open a Channel
    tokenNetworkContract.once('ChannelOpened', event =>
      console.log('Event listener: a Channel was opened!')
    )

    const tx = await tokenNetworkContract.openChannel(
      accounts[0],
      accounts[1],
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
  } catch (error) {
    console.error(error)
  }
})()
