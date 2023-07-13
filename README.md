# Saver Community

Saver Community is a Decentralized Application deployed in the Moonbeam Blockchain, focused on increment the savings of his users (USDC and USDT).
Basically you have to buy Able (the official ERC20 Token of this dapp) and hold it.
Everytime that you buy Able, you are buying points too. These points are useful to achieve the daily requirements of the dapp.
You will have to achieve some requirements daily. For example:
- Increment your Points in 0.9%
- Answer a Video Test
- Have an NFT of the dapp.
- Have at leats 3 Points.
- Your points have to be less than your USDT and USDC Savings.

## How we did it?
### Website
The website is built with these tools and frameworks:
- [React](https://legacy.reactjs.org/)
- [NextJS](https://nextjs.org/)
- [ChakraUI](https://chakra-ui.com/)
- [Firebase Hosting](https://firebase.google.com/)

### Smart Contracts
The Smart Contracts are written in Solidity, and deployed in the Moonbeam Blockchain.

## Where is implemented?
📁 pages
> As we use NextJS to create the website of this dapp, here will be all the pages that the user can access though his web browser.

📁 public
> This folder contains the favicon of the website.

📁 src
> This is the main important folder of this project. Here is all the components that compose the pages of the website, the functions that reads data from the Smart Contracts deployed on the Blockchain and also here is the code of those Smart Contract.

📁 styles
> This folder contains only styles files, to incorporate to the context of ChakraUI.

***The rest of the folders and files are just auto generates for NextJS and Firebase.***