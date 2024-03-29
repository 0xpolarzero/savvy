Just some personal unfiltered notes, not meant to be read by anyone else than me; please don't.

## TODO

[ ] See this for editor (optimize-dependencies but with code editor, analyze dependencies, provide alternative, compile + deploy both contracts, run some calls and let the user know the difference): https://github.com/evmts/tevm-monorepo/blob/40263b9eb62edb557d8ddbea45d29ddf755eb1e1/examples/vite/src/SolEditor.tsx

- Also that to compile: https://github.com/evmts/tevm-monorepo/blob/40263b9eb62edb557d8ddbea45d29ddf755eb1e1/examples/vite/src/SolcWorker.ts

[ ] use tx hashes instead of id when it's available

[ ] wallet/social login to sync with local storage: display wallet + tooltip on top right; when doing a transaction, after saved to local storage, trigger a sync if connected; on connection, sync, meaning, if a tx hash in not in local storage, get it, and if not online, push it; display tooptip top-right: info when not connected (can't sync), success when synced, some loading when syncing

[ ] Error handling: whenever an error occurs, the toast "contact" button should open a modal, with:

- a code block with all the values for the stores in json that can be copy/pasted
- a quick and a more long version of bug reporting: quick is just drop a dm with the logs, longer would be with some details, screenshots, etc
- maybe just automatically send/save the logs somewhere? would rather have the user decide if they want to send it or not, although the logs (stores) won't contain any sensitive information at all; or at most only send the data that comes from the app and nothing related to the user input

[ ] Fix nextBaseFee => priority ratios; really bad with Polygon as the priority fee starts too high related to the base fee (needs a special case)

[x] Save results history in local storage, and let the user retrieve them

[ ] Handle issues in retrieving token price (coinmarketcap), and other api calls as well (gas fees) => if error, use a default value & let the user choose

[ ] Add guides; e.g. on airdrop page, a button in the sidebar to go to a quick guide to use it

[ ] Add documentation (use vocs.dev) for both guides and breakdowns, how it works, calculations, contributing, roadmap, etc

[ ] Button "share results" to export them (md? pdf? json?); probably a table as well as all the details in a concise document

[x] in the local-chain api, return different error codes based on what failed, and decode them browser-side to display in the toast

[x] When integrating Arbitrum, will need to change 'hasCustomStack' to differenciate OP and Arbitrum

[x] Add a "underlying" property on rollups to be able to calculate the fee later, for instance the id of the underlying chain (e.g. currentChain being Optimism, we need to access the Ethereum client)

- Use 2 gas price selection to simulate both the L2 and the L1 conditions
- We can't just return a l1Submission string/bigint to account for that, needs more complex logic

[ ] Allow do estimation with url query (amount of recipients, sender, token address, type…); even though drop.gaslite.org or any app can already do so with `estimateGas`, this provides a nice table with results + lets user estimate with different network conditions => basically sharing a simulation to reren it

- also maybe if more convenient directly an api endpoint would be better? Actually maybe can be setup from vercel

[x] REFACTORED: Put gas price & native token price inside Advanced (in a collapsible)

[x] Utils to convert gwei (or anything really) based on currency; e.g. L2 on OP stack need at least 3-4 decimals when Ethereum/Polygon is ok with 2

[x] REFACTORED: See if there is a "maxSupply" for the provided token (BEFORE fetching local-chain), and if so, compare it to the amount of tokens airdropped; if not enough, ask the user to provide an account that owns enough tokens

[x] Use some kind of toggle group for recipients amount/custom data

- when clicking on "mock" data, highlights input + slider, otherwise click on custom data (just the button like custom token but above the textarea on the left, and amount of recipients small on the right?) and highlight it and grey out the other
- Add accordion for example data

[x] DONE: Add custom priority fee button, and actually move "low", "medium" and "high" to a more stealthy place like right below

[x] DONE: Move everything using alchemy id in an api route, pass the chainId, the method from the client (with the params) the params and return the data; for each call to the api, decode the params using a type for this specific call (considering what should be returned)

[x] DONE: Put token above recipients, with a check "custom options" that opens a collapsible and sets some bool to true

[x] DONE: Same with the recipients, with a custom option to use custom addresses/amounts/(ids)

---

## Steps

[x] For ERC20, just fetch the owner of the token contract (if any), and either mint as them or as the contract itself

[ ] For ERC721, except if there is something better, crawl through the token IDS, see if there is an owner; if there is, impersonate them and send the token(s) to our caller, if not, mint them

[ ] For ERC1155, same as ERC721, but just mint the tokens for each id

---

## Error cases (to handle)

Just search for anny "throw" and "console.error" in the code

[ ] revert in a Tevm call

[ ] provided arguments (addresses, amounts, ids) not valid

[ ] provided token not found/issue

[ ] provided owner/holder not able to mint, not holding enough tokens

[ ] provided token not mintable/transferrable (see call revert)
