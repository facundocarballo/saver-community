# Smart Contract - Router

## How Router works?
The Router is a Contract inherit by all the Smart Contracts of Saver Community. This Contract stores a reference to the Addresses Contract, and another references for all the Smart Contracts of Saver Community. Including a counter ***contract_ids*** to compare with the last version of the Addresses Contract.

The Router have a function ***RefreshContracts*** who is called by the function of the Addresses Contract ***RefreshAll***. This function try to update the versions of the contracts that this contract have, using the Addresses Contract as reference.

For the other hand, ***RefreshAll*** calls to all the ***RefreshContracts*** of all the Smart Contracts of Saver Community. Guarantees so that all the Contracts will be updated with the last versions of Contracts.