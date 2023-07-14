# Contracts

This folder contains all the Smart Contracts that this dapp use.

## How they work together?

![Smart Contracts Diagram](https://i.ibb.co/mN7sQYd/Saver-Community-Contracts.png)

All the Smart Contracts of this dapp are related with each other, using this Router Smart Contract.

The Router, have references of all the Smart Contract and each Smart Contract have an instance of this Router.

The Router have a reference for all the Smart Contract of this dapp. Each Smart Contract have an instance of this Router, so each Smart Contract have access to any Smart Contract of the ecosystem.

The Router is here to help the development process. If we need to change something in some Smart Contract, we can just deploy a new Smart Contract to the Blockchain and set the new Contract Address to the Router. With that, all the Smart Contract now are linked to the new Smart Contract too.

## Where is implemented?
📁 Migration
> Here are all the Smart Contracts related to the Migration. Remember that Saver Community launches first in July of 2022, so now some users have to migrate to the new version.

📁 Oldest
> Here are all the Oldest Smart Contracts that Saver Community used on the first launch (July 2022).

📁 Rewards
> Here are all the Smart Contracts related to the Rewards in Saver Community. All the Rewards have the same structure, all inherits from the Smart Contract BaseReward.

📄 Able.sol
> This is the Smart Contract of Able.

📄 Addresses.sol
> This is the Smart Contract that the Router implementation has. (This is the contract that are in the Diagram upsthere as Router)

📄 Clock.sol
> This is the Smart Contract of the Dapp Clock. This Smart Contract set the pace of the dapp.

📄 Contracts.sol
> This is the most important file. This file contains all the Smart Contracts integrated in only one file. This file was used to deploy all the Smart Contracts.

📄 history.txt
> This file saves a record of all the versions of Smart Contracts that we deployed to test until get this final version of Saver Community.

📄 Router.sol
> This is a Smart Contract is inherit by all the other Smart Contracts of Saver Community. All the other contracts inherits this Smart Contract.

📄 SynergySale.sol
> This Smart Contract handles the sale of Able in the Dapp.

📄 Synergy.sol
> This Smart Contract is responsible for the NFTs of Saver Community.

📄 Test.sol
> This Smart Contract handles the daily Test that the users have to answer it to qualify in the game.

📄 User.sol
> This Smart Contract handles the qualification of the user in the game.

## Guide to Deploy all the Smart Contracts.
1. Deploy the Addresses Contract.
2. Set the Address of the Adresseses Contract to the Router.
3. Compile all the contracts again.
4. Deploy all the Smart Contracts of Saver Community. (in any order).
5. Set all the Contract Addresses generated in the Addresses Contract.
6. Call to "RefreshAll" function of the Addresses Contract.
7. Migrate Able.
8. Set the Contracts Addresses in ***src/web3/funcs/index.js***
