# @project/contracts

A minimalist, opinionated structure for managing smart contract ABIs and addresses.<br/>

[Read more about Application Binary Interfaces (ABIs) here](https://ethereum.stackexchange.com/questions/234/what-is-an-abi-and-why-is-it-needed-to-interact-with-contracts).

## Contracts

|Name|ABI|Network|Description|
|--|--|--|--|
|[TokenNetwork](https://goerli.etherscan.io/address/0x3EA2a1fED7FdEf300DA19E97092Ce8FdF8bf66A3)|[tttNetwork.json](./packages/contracts/src/abi/tttNetwork.json)|Goerli|Raiden Network's TokenNetwork contract for the TTT ERC-20 token
|[CustomToken](https://goerli.etherscan.io/address/0x59105441977ecd9d805a4f5b060e34676f50f806)|[tttErc20.json](./packages/contracts/src/abi/tttErc20.json)|Goerli|ERC20 Token Contract|

## Interact with smart contracts
I had to watch for smart contracts events. I had several possibilities:
1. Wait for events to be fired by the TokenNetwork contract deployed on goerli. It is obviously **not ideal** as it means I have to wait and "hope" for events to be eventually fired after other people transacted.
2. Interact myself with the TokenNetwork contract deployed on Goerli.
3. Deploy my own contracts locally ([TokenNetwork](./contracts/TokenNetwork.sol) and [SecretRegistry](./contracts/SecretRegistry.sol)). Send transactions manually. Connect metamask to the ganache local blockchain.

**Option 2 is the easiest** and involves the following steps:
1. Generate brand new mnemonic for more security: `npx mnemonics`
2. Import mnemonic in metamask
3. Request ETH on a goerli faucet
3. Go to TokenNetwork's etherscan [read Contract mask](https://goerli.etherscan.io/address/0x3EA2a1fED7FdEf300DA19E97092Ce8FdF8bf66A3#readContract). Note `settlement_timeout_min` and `settlement_timeout_min`.  
Indeed upon reading the [TokenNetwork.sol](https://github.com/raiden-network/raiden-contracts/blob/master/raiden_contracts/data/source/raiden/TokenNetwork.sol) contract, we see that the [`openChannel`](https://github.com/raiden-network/raiden-contracts/blob/master/raiden_contracts/data/source/raiden/TokenNetwork.sol#L276) function relies on the [`settleTimeOutValid`](https://github.com/raiden-network/raiden-contracts/blob/master/raiden_contracts/data/source/raiden/TokenNetwork.sol#L208) modifier. This modifier requires to be between `settlement_timeout_min` and `settlement_timeout_max`. These 2 values are passed as parameters to the [`constructor`](https://github.com/raiden-network/raiden-contracts/blob/master/raiden_contracts/data/source/raiden/TokenNetwork.sol#L226). They are set at contract creation. So we need to read them from the contract state.
4. Go to TokenNetwork's etherscan [write Contract mask](https://goerli.etherscan.io/address/0x3EA2a1fED7FdEf300DA19E97092Ce8FdF8bf66A3#writeContract).
5. Open Channel passing the necessary arguments. Especially a valid `settle_timeout` value between 20 and 555428.

A main limitation with option 2 is that I don't own any [CustomTokens](https://goerli.etherscan.io/address/0x59105441977ecd9d805a4f5b060e34676f50f806) so I won't be able to test other functionalities like exchanging tokens then closing and settling a channel.  

For this reason and for the sake of the challenge, **I decided to try option 3 instead**.  

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
3. `yarn openChannel`: opens a new channels


