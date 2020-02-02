# Why I chose to use (and not use) various design patterns

### 1. Fail early and fail loud
I used this design pattern often in order to throw an exception if a condition is not met before executing a function. For example, in the clientWithdrawal function in ProjectAgreements.sol was used to ensure that the client balance exceeded the withdrawal amount before proceeding.

### 2. Restricting access
I used this design pattern often to ensure that only specific addresses could execute certain functions. For example, the deposit function in ProjectAgreements.sol only allows the client to deposit funds into the contract.

### 3. Mortal
I did not use the mortal design pattern because this contract serves as an impartial arbiter between the service provider and client. Giving either party the ability to selfdestruct the contract would create the risk that they could withdraw funds that belonged to, or could in the future belong to, the other party to the contract.

### 4. Withdrawal pattern
I used the withdrawal pattern in the clientWithdrawal and serviceProviderWithdrawal functions in ProjectAgreements.sol. This was to avoid the security risk that a contract could call into a withdrawal function that directly transferred funds. The withdrawal function would hand over control to the calling contract, which could allow it to obtain multiple refunds.

### 5. State machine
The state machine design pattern is used in this project in the Phase struct to keep track of the current phase. This makes it possible to prevent execution of functions that do not apply to the current phase.

### 6. Circuit breaker
I felt that a circuit breaker did not make sense because there is no one owner to whom funds could be transferred in the case of an emergency stop. The contract services as an intermediary between a client and service provider who both have a stake in the funds stored in the contract so a circuit could provide a security risk.