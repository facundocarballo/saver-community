# Smart Contracts - Rewards

This folder contains all the Rewards on Saver Community.

## How Rewards works?
The Reward Conctracts handles only one token per Contract, so for the Rewards of Synergy who works with ABLE and DAI, it's deployed one Contract for each token in each Reward. So, Synergy handles 6 Rewards Contracts
- Stablecoin ConfidenceReward
- Stablecoin ConstancyReward
- Stablecoin ValueReward
- Able ConfidenceReward
- Able ConstancyReward
- Able ValueReward

All the Rewards in Saver Community works in this way. Everytime that a Cycle changes, the Rewards gets the total amount of tokens that they have in the Contract, and set that value as the total amount collected. Everytime that a user Update in Saver Community, all the Rewards Contracts are notify of these and each one try to include this user to the next reward. If the user applies to get into the Reward, the Reward Contract will handle it. That is because we need know how much users are participing in each reward, to distribute it all equally. So, the users when they Update Saver Community in certain point they are asking to these Rewards Contracts if they can participate in the next reward.

## Where is implemented?
📁 BaseReward
> This folder contains the Smart Contract Base of all Rewards. From this Smart Contract inherits all the other Reward Contracts. This Contract handles the Stablecoin Reward in Able.

📁 ConfidenceReward
> This folder contains the Smart Contract of the ConfidenceReward. This Contract is one of the three Rewards Contracts who handles the Stablecoin and Able Reward in Synergy.

📁 ConstancyReward
> This folder contains the Smart Contract of the ConstancyReward. This Contract is one of the three Rewards Contracts who handles the Stablecoin and Able Reward in Synergy.

📁 ValueReward
> This folder contains the Smart Contract of the ValueReward. This Contract is one of the three Rewards Contracts who handles the Stablecoin and Able Reward in Synergy.