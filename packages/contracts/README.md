# @project/contracts

A minimalist, opinionated structure for managing smart contract ABIs and addresses.<br/>

[Read more about Application Binary Interfaces (ABIs) here](https://ethereum.stackexchange.com/questions/234/what-is-an-abi-and-why-is-it-needed-to-interact-with-contracts).

## Contracts

|Name|ABI|Network|Description|
|--|--|--|--|
|[TokenNetwork](https://goerli.etherscan.io/address/0x3EA2a1fED7FdEf300DA19E97092Ce8FdF8bf66A3)|[tttNetwork.json](./packages/contracts/src/abi/tttNetwork.json)|Goerli|Raiden Network's TokenNetwork contract for the TTT ERC-20 token
|[CustomToken](https://goerli.etherscan.io/address/0x59105441977ecd9d805a4f5b060e34676f50f806)|[tttErc20.json](./packages/contracts/src/abi/tttErc20.json)|Goerli|ERC20 Token Contract|

## Local smart contract development
For development purposes, I had to be able to trigger events manually.
As I don't own any [CustomTokens]((https://goerli.etherscan.io/address/0x59105441977ecd9d805a4f5b060e34676f50f806)), I had to deploy my own contracts locally ([TokenNetwork](./packages/contracts/contracts/TokenNetwork.sol) and [SecretRegistry](./packages/contracts/contracts/SecretRegistry.sol)) and send transactions manually.  

First, install openzeppeling SDK with `yarn install`. Then either one decides to use the interactive cli or to interact with the contract programatically.
### With [OpenZeppelin interactive CLI](https://docs.openzeppelin.com/cli/2.8/commands)
1. `npx oz compile`: compile `.sol` files in `/contracts` and store them in `src/abis`
2. `yarn ganache`: starts a local blockchain with [ganache-cli](https://github.com/trufflesuite/ganache-cli)
2. `npx oz deploy`
3. `npx oz send-tx`: send atransaction and provide functions parameters interactively via CLI
See more exhaustive infos about commands in [docs](https://docs.openzeppelin.com/cli/2.8/commands)

### Programatically with [ethers.js](https://docs.ethers.io/v5/)
1. Compile with `npx oz compile`
2. `yarn ganache`: starts local blockchain
2. `yarn test`, will:
    1. Deploy an ERC20 contract
    2. Deploy a SecretRegistry contract
    3. Deploy a TokenNetwork contract
    4. Open a Channel
    5. Check for ChannelOpened event emission

