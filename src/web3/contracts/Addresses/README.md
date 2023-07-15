# Smart Contract - Addresses

[Moonbeam Scan - Contract](https://moonbeam.moonscan.io/address/0xf7ca5aeb3d2dbc0012f153224e22a1757c8f83f5)

## How Addresses works?
This Contract is deployed in the Blockchain regardless to the rest of the Contracts of Saver Community. 

This Contract handles the references between the Contracts of Saver Community.

When someone wants to change some Contract, they will have to set that new Contract in this Addresses Contract. To make that, this Contract have a set function for all the Smart Contracts of Saver Community, and a RefreshAll function who update the reference of all the Smart Contracts.

All the Contracts of Saver Community have an instance of this Addresses Contract, that is because all the Contracts inherit of Router (a Smart Contract who guarantee that the contract will have the last version of the contracts in the Addresses Contract)