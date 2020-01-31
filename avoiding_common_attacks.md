# Measures I took to avoid common attacks

I used the withdrawal pattern to avoid the security risk that a contract could call into a withdrawal function that directly transferred funds. The withdrawal function would hand over control to the calling contract, which could allow it to obtain multiple refunds.

To avoid reentrancy attacks, I avoided use of the call function to transfer funds in the withdrawal process and also reduce the balance of the party requesting a withdrawal before the withdrawal is executed.

I realized late in the design process that my contract is vulnerable to the integer overflow and underflow attacks. Since this project is just a proof of concept, I decided not to address this now but noted that if the project moves forward implementing a fix such as the OpenZepplin SafeMath library should be a priority.