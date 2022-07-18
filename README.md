# Channels Raidar

Monitoring of [Raiden Network](https://raiden.network/) Payment Channels.  
<p align="center">
    <img width="700" alt="Screenshot 2022-07-18 at 15 53 35" src="https://user-images.githubusercontent.com/38692952/179526936-ae3ce214-6beb-4efe-801f-ce1f3e84772c.png">
</p>
## Requirements

### [Initial](https://gist.github.com/r1oga/3d2749210a994749b57a39695fdf81e9)
- [x] Observe and list the `ChannelOpened`, `ChannelClosed` and `ChannelSettled` events emitted by the smart contract
- [x] Keep a list of the open raiden channels
- [x] List should update as new events are observed
- [x] Write either in TypeScript or JavaScript
- [x] Use any of the following frameworks: ~~Vue.js~~, React, ~~Angular~~
- [x] Build using a testable architecture
- [x] Manage state (easy-peasy + use of react context and hooks)
- [x] Provide tests: some tests are written but of course more are to be written

### Additional
- [x] Query smart contract state history using a [The Graph](https://thegraph.com/)'s [subgraph](https://thegraph.com/explorer/subgraph/r1oga/raiden-channels)
- [x] Filter by channel state (open, closed, settled)
- [x] Filter by channel's participant address

## Project structure
This project is made of 3 packages:
### [contracts](./packages/contracts)  
Smart contracts `.sol` file, ABIs `.json` files, contracts addresses, local smart contracts development
### [react-app](./packages/react-app)  
Fork of the default [create-react-app](https://github.com/facebook/create-react-app) template
### [subgraph](./packages/subgraph)  
[The Graph](https://thegraph.com/) is a tool for for indexing events emitted on the Ethereum blockchain. It provides you with an easy-to-use GraphQL API. To learn more, check out the [The Graph documentation](https://thegraph.com/docs)  
[**Deployed Raiden Channels Subgraph**](https://thegraph.com/explorer/subgraph/r1oga/raiden-channels)  
Caveat:
> By default query responses are **limited to 100 items per collection**. If you want to receive more, you can go up to 1000 items per collection and beyond that you can paginate.
See [thegraph faq](https://thegraph.com/docs/quick-start#faq)
## Available Scripts
Owing to this dependency on Yarn Workspaces, Create Eth App can't be used with npm.  
Each script can be run either from the root folder with `yarn [package]:[script]` or from within a package folder with `yarn [script]`.

|Package|Script|Description|
|--|--|--|
|contracts|ganache|Starts a local blockchain (deterministic, goerli, port 8545) with ganache-cli.|
|contracts|test|**[dev branch only, after using the ganache script]** Deploys contracts (ERC20, SecretRegistry and TokenNetwork. Opens a channel. Watch event.|
|contracts|openchannel|**[dev branch only, after using the ganache and test scripts]** Executes the `openChannel` function of `TokenNetwork.sol` to fire an `OpenedChannel` event.|
|react-app|start|Runs the React app in development mode at [http://localhost:3000](http://localhost:3000).|
|react-app|test|Runs the React test watcher in an interactive mode.|
|react-app|build|Builds the React app for production to `packages/react-app/build`.|
|react-app|eject|Remove the single build dependency from your React package.|
|subgraph|codegen|Generates AssemblyScript types for smart contract ABIs and the subgraph schema.|
|subgraph|build|Compiles the subgraph to WebAssembly|
|subgraph|auth|Before deploying your subgraph, you need to sign up on the [Graph Explorer](https://thegraph.com/explorer/). You will need to provide your access token|
|subgraph|deploy|Deploys the subgraph to the official Graph Node.|

## Built with
- [Open Zeppelin SDK](https://openzeppelin.com/sdk/): the Ultimate Smart Contract Toolkit
- [Create Eth App](https://github.com/paulrberg/create-eth-app) by [PaulRBerg](https://github.com/paulrberg)
- [Rimble UI](https://rimble.consensys.design/): open-source React component library for dApps
- [Easy Peasy](https://easy-peasy.now.sh/): Vegetarian friendly state for React
- [The Graph](https://thegraph.com/): APIs for a vibrant decentralized future
- [web3-react](https://github.com/NoahZinsmeister/web3-react): A simple, maximally extensible, dependency minimized framework for building modern Ethereum dApps
- [ethers.js](https://github.com/ethers-io/ethers.js/): Complete Ethereum library and wallet implementation in JavaScript.
