# Self-enforcing smart contracts avoid project work disputes

Here’s a link to a video demonstration of the software: https://www.youtube.com/watch?v=EVH_bu5H0-4&feature=youtu.be.

## Client/service provider relationships are difficult to manage
I was in business providing marketing services to technology companies for many years so I know firsthand that it’s often difficult to make and enforce project agreements between service providers and their clients. A legal agreement is too expensive for most projects. So project work is usually governed by verbal agreements whose lack of clarity often leads to disputes. If one party doesn’t fulfill its obligations, the other party is typically out of luck. Even where a legal agreement exists, going to court to enforce it is so expensive that it only makes sense for the largest projects.

## How the blockchain can help improve project work
I have attempted to develop a blockchain application called Project Agreements that can solve this problem by defining an agreement between the service provider and client and then holding the funds owing under the agreement until specific terms agreed to by both are fulfilled. The application enables the parties to define an agreement between contractor and client based on whatever terms are agreeable to both parties in less than a minute. The agreement can easily be subdivided into phases to reduce the risk of the parties. The funds owed under the agreement are held in escrow in the contract until the agreement is fulfilled. Either party is able to cancel the contract and in that case funds held by the contract are divided between the two parties according to the terms of the agreement. 

## Key features of the software
- Service provider defines the phases of the project and specifies an initial and final payment for each
- The client approves the phase structure so both parties have now agreed to honor it
- The client makes a deposit to the contract to cover both initial and final payments for the first phase
- The service provider executes the start phase function which moves the client’s deposit into the escrow account and begins work on the project.
- When the client is satisfied that the service provider has completed the first phase, the client approves the phase and the initial and final payments are moved from the escrow account to the service provider’s account.
- As long as the client is happy with the service provider’s work, each phase is completed as described above until the project is finished.
- If either the service provider or client is unhappy with the other party, they have the option of cancelling the project.
- If the client cancels, then the service provider receives the initial payment in compensation for their work in progress while the final payment is returned to the client.
- If the service provider cancels, then both the initial and final payments are returned to the client.
- This approach gives each party the incentive to work with the other to complete the project rather than cancel it prematurely.

## Advantages of this application compared to current methods
The risk to each party is reduced because the funds are held by an impartial smart contract that releases them according to rules that have been agreed in advance by both parties. Transaction costs, including the cost of creating and enforcing the agreement, are virtually zero. Embedding project agreements into a smart contract also creates the potential to define large numbers of smart contracts to unleash an army of freelancers to accomplish projects or goals of a magnitude that today must be handled by organizations with large numbers of employees.

## How to install and demo the software
1. Install Node.js if it is not already installed: $ sudo apt install nodejs
2. Install npm: $ sudo apt install npm
2. Install git if it is not already installed: sudo apt install git
3. Install Truffle: $ npm install truffle -g
4. Install Ganache CLI: npm install ganache-cli -g
5. Create a new subdirectory and clone the repo:  git clone https://github.com/JerryFireman/class-project.git
6. Install dependencies: $ npm install
6. Disable the Metamask extension if it is enabled (this application supports Metamask but demonstrating it requires multiple users which makes it awkward to use Metamask): In Chrome, select three dots menu on upper right, more tools, extensions, disable Metamask.
8. Run Ganache CLI: ganache-cli
9. Compile the contracts and run tests: $ truffle test
10. Deploy the contracts to the Ganache blockchain: $ truffle migrate
11. Open a browse and navigate to the client subdirectory of the repo clone directory: cd ./src/client
12. Run the React app: $ npm run start
13. A new browser window should open with the app running


## Project requirements guide