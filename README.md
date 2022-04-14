# Frontend instruction

## Getting started
1. `cd client` and `npm i` to get node_modules
2. run `npm start` to start the application locally.

## Deployment with Heroku
1. Ensure that `/src/abis` contain the ABIs for Ropsten Testnet
2. Ensure that you have Heroku installed and connected to the right project.
3. run the command `git subtree push --prefix client heroku master`
# Backend instructions
1. truffle migrate
2. take note of contract address
3. copy ABI to client ABIs folder