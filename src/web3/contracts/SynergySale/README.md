# Smart Contracts - Synergy Sale

## How SynergySale works?
This Contract handles the Buy/Sell of Able token inside of Saver Community.

### How Can I sell Able?
Each user who have at least one NFT and while this user is qualified, can post ABLE to sell in the Synergy Sale List.
Each post of Able have to be set between a minimun and a maximun value set for the admins of Saver Community. Initially this values are:
- Minimun: 9 Able
- Maximum: 90 Able

The price for each Able sold is set initially on 3 DAI, so each Able sold it's equals to 3 DAI. But, the user doesn't receive 3 DAI for each Able sold. For each sold, the DAI received in the Smart Contract is distributed in this way:
- 33% to the user who post that Ables.
- 33% to the daily reward of Able.
- 33% to the admins.

So technically, the users who post Able to sell in the Synergy Sale List, potencially will receive 1 DAI for each Able posted. This is a potencial result, because if the user isn't qualfified to the moment of selling this Able, this user will receive the 50% of the tokens that are supouse to be for him.

### How can I buy Able?
It's simple, in the dapp of Saver Community you will find a button to buy Able. 

You will need 3 DAI for each Able that you want to buy.

You only can buy the amount of Able that are posted in the Synergy Sale List. If you want more Able than the posted, you will have to wait...

### How works the process of buying?
When you buy Able to the Synergy Sale List, you are buying to the first post on the list, if the amount that this user isn't enought, you will also buy to the next user on the list, and so on, until you get the amount that you want.

### How works the Driven List?
The Driven List is a parallel list to the sell list, works in the same way. The main difference is that the contract will ask two times for a user in the driven list and one time for a user in the sell list. This is because we want to improve those users who are active in Saver Community.

To be part of the Drive List you will have to post Able to Sell, and then you will have to Create a new NFT or Earn the Able Reward.