# Will Work for Dai blockchain app helps manage and enforce project work agreements
Here’s a link to a video demonstration of the software: https://www.youtube.com/watch?v=EVH_bu5H0-4&feature=youtu.be.

## Client/service provider relationships are difficult to manage
I spent considerable time running a business providing services to other businesses on a project basis so I know firsthand that it’s often difficult to make and enforce project agreements between service providers and their clients. A legal agreement is too expensive for most projects. So project work is usually governed by verbal agreements whose lack of clarity often leads to disputes. If one party doesn’t fulfill its obligations, the other party is typically out of luck. Even where a legal agreement exists, going to court to enforce it is so expensive that it only makes sense for the largest projects.

## How the blockchain can help improve project work
The Will Work for Dai blockchain app addresses this problem by defining an agreement between the service provider and client and then holding the funds owing under the agreement until specific terms agreed to by both are fulfilled. The application enables the parties to define an agreement between contractor and client based on whatever terms are agreeable to both parties in less than a minute. The agreement can easily be subdivided into phases to reduce the risk of the parties. The funds owed under the agreement are held in escrow in the contract until the agreement is fulfilled. Either party is able to cancel the contract and in that case funds held by the contract are divided between the two parties according to the terms of the agreement. 

## Key features of the software
- Service provider defines the phases of the project and specifies a locked and discretionary payment for each.
- The client approves the phase structure so both parties have now agreed to honor it.
- The client makes a deposit to the contract to cover both locked and discretionary payments for the first phase.
- The service provider executes the start phase function which moves the client’s deposit into the escrow account and begins work on the project.
- When the client is satisfied that the service provider has completed the first phase, the client approves the phase and the locked and discretionary payments are moved from the escrow account to the service provider’s account.
- As long as the client is happy with the service provider’s work, each phase is completed as described above until the project is finished.
- If either the service provider or client is unhappy with the other party, they have the option of cancelling the project.
- If the client cancels, then the service provider receives the locked payment in compensation for their work in progress while the discretionary payment is returned to the client.
- If the service provider cancels, then both the locked and discretionary payments are returned to the client.
- This approach gives each party the incentive to work with the other to complete the project rather than cancel it prematurely.

## Advantages of this application compared to current methods
The risk to each party is reduced because the funds are held by an impartial smart contract that releases them according to rules that have been agreed in advance by both parties. Transaction costs, including the cost of creating and enforcing the agreement, are virtually zero. Embedding project agreements into a smart contract also creates the potential to define large numbers of smart contracts to unleash an army of freelancers to accomplish projects or goals of a magnitude that today must be handled by organizations with large numbers of employees.

## How to install and demo the software 
1. Update apt package manager: $ sudo apt update
2. Install git: $ sudo apt install git
3. Install Node.js from the repositories: sudo apt install nodejs
4. Install npm: $ sudo apt install npm
5. Install curl: $sudo ap-get install curl
6. Install nvm: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
7. Close and reopen your terminal
8. Install Truffle: $ npm install truffle -g
9. Install Ganache CLI: $ npm install ganache-cli -g
10. Clone the repo:  git clone https://github.com/JerryFireman/will-work-for-dai.git
11. Navigate to the client subdirectory of the new project-agreements directory and install create-react-app dependencies: $ npm install
12. Disable the Metamask extension if it is enabled (this application supports Metamask but it requires multiple users which makes it difficult to use Metamask since as far as I know Metamask injections only a single account): In Chrome, select three dots menu on upper right, more tools, extensions, disable Metamask.
13. Compile the contracts and run tests: $ truffle test
14. Run Ganache CLI: $ ganache-cli
15. Deploy the contracts to the Ganache blockchain: $ truffle migrate --reset
16. Navigate to the client subdirectory of the repo clone directory: cd client
17. Run the React app: $ npm run start
18. A new browser window should open with a default project named "Sample Project"
19. Create a phase for the project by filling in the form under "Phase Structure of this Project. Enter a name for the phase, and an locked and discretionary payment. The difference between the locked and discretionary payment is that if the client cancels the project during the phase, the locked payment goes to the service provider as compensation for work completed to date while the discretionary payment is returned to the client. When the form is filled in, click "Create new phase" and the phase will appear in the phase structure of the project. Create several more phases if you wish.
20. Once the phase structure is completed, the client must approve the phase structure by pressing the "Approve phase structure" button.
21. Before the project can begin, the client must deposit enough funds to cover the locked and discretionary payments for the first phase of the project. Fill in the amount of eth to deposit in the "Deposit funds" form in the client dashboard and press the button to make the deposit. As soon as the blocks are mined, the deposit will appear in the client balance under "Overview of current project: Sample Project". 
22. Next, the first phase can be started by pressing "Start next phase" in the service provider dashboard. Notice how the client's deposit moves from the client balance to the escrow balance. It is now being held by the contract in escrow and cannot be withdrawn by either party. 
23. As a next step, approve the first phase by pressing the "Approve current phase" button in the client dashboard. The funds to pay for the phase now move from the escrow balance to the service provider balance. 
24. You can now enter the amount earned by the service provider in the first phase in the "Withdraw funds" form in the service provider dashboard and press the button to make the withdrawal. Note how the service provider balance is updated.
25. Now let's experiment with the functionality for cancelling a phase. Make the required deposit for and approve the next phase as explained above. Then instead of approving the phase, cancel the phase from either the service provider or client dashboard. If you experiment with cancelling from both dashboards, you'll see that whichever party initiates the cancelation is penalized by losing the locked payment. This incentivizes the parties to cooperate with each other to complete the project.