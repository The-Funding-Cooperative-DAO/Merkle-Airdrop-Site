# Merkle Airdrop Site

Quickly bootstrap an ERC20 token airdrop to a Merkle tree using an uploaded CSV file of recipients with an interactive frontend to allow whitelisted addresses to claim tokens.

Steps:

1. Launch MerkleClaimERC20 contract that verifies claimee. Made to deployed only once with updates available for new airdrops. Follow README in [contracts/](https://github.com/The-Funding-Cooperative-DAO/Merkle-Airdrop-Site/tree/master/contracts)
2. Generate Merkle tree of recipients from csv by following README in [generator/](https://github.com/The-Funding-Cooperative-DAO/Merkle-Airdrop-Site/tree/master/generator)
3. Setup and deploy front-end by following README in [frontend/](https://github.com/The-Funding-Cooperative-DAO/Merkle-Airdrop-Site/tree/master/frontend)

## Similar work and credits

- [Astrodrop](https://astrodrop.xyz/)—Simpler way to spin up a airdrop with claim page, given existing token
- [Uniswap Merkle Distributor](https://github.com/Uniswap/merkle-distributor)—Uniswap's merkle distribution smart contracts
- Forked from https://github.com/Anish-Agnihotri/merkle-airdrop-starter/blob/master/LICENSE

## License

[GNU Affero GPL v3.0](https://github.com/MadDog250/merkle-airdrop-starter/blob/master/LICENSE)

## Disclaimer

_These smart contracts are being provided as is. No guarantee, representation or warranty is being made, express or implied, as to the safety or correctness of the user interface or the smart contracts. They have not been audited and as such there can be no assurance they will work as intended, and users may experience delays, failures, errors, omissions or loss of transmitted information. Michael Maher is not liable for any of the foregoing. Users should proceed with caution and use at their own risk._
