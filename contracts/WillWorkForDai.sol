pragma solidity >=0.4.21 <0.7.0;

// @title Will Work for Dai: Self-enforcing smart contracts avoid project work disputes
// @author Jerry Fireman

contract WillWorkForDai {

    // @dev The person providing the service
    address payable public serviceProvider;

    // @dev Used to track the numbers of project phases
    uint public idGenerator = 1;

    // @dev Tracks the information associated with each phase
    struct Phase {
        string name;
        string description;
        uint lockedPayment; // this goes to service provider when client approves phase;
            // it goes to service provider if client cancels or client if service provider cancels
        uint discretionaryPayment; // this goes to service provider when client approves phase; to client if service provider or client cancels
        bool phaseStarted; // service provider starts the phase; initial payment moves into escrow
        bool clientApproved; // set true when client approves phase
    }

    // @dev Tracks the information associated with the project
    struct Project {
        string name;
        string description;
        address payable client;
        mapping (uint => Phase) phases;
        uint currentPhase;
        uint serviceProviderBalance;
        uint escrowBalance;
        uint clientBalance;
        bool clientApprovedPhaseStructure;
        bool projectCancelled;
        bool projectCompleted;
        bool phaseExists; // Tracks whether at least one phase has been created
    }

    Project thisProject;

    // @dev Throws error if the msg.sender is not the service provider
    modifier onlyServiceProvider {
        require(msg.sender == serviceProvider, "Message sender is not service provider");
        _;
    }

    // @dev Throws error if the msg.sender is not the client
    modifier onlyClient {
        require(msg.sender == thisProject.client, "Message sender is not client");
        _;
    }

    // @dev Throws error if phase structure has been approved by client
    modifier phaseStructureNotApproved {
        require(thisProject.clientApprovedPhaseStructure == false, "Client has approved phase structure so it cannot be changed.");
        _;
    }

    // @dev Sets serviceProvider to the address that instantiated the project
    // @dev Sets the appropriate project details
    constructor(string memory _name, string memory _description, address payable _client)
        public
    {
        serviceProvider = msg.sender;
        thisProject.name = _name;
        thisProject.description = _description;
        thisProject.client = _client;
        thisProject.currentPhase = 0;
        thisProject.serviceProviderBalance = 0;
        thisProject.escrowBalance = 0;
        thisProject.clientApprovedPhaseStructure = false;
        thisProject.projectCancelled = false;
        thisProject.projectCompleted = false;
        thisProject.phaseExists = false;
    }

    // @dev Used by client to deposit funds into contract
    function deposit()
        public
        payable
        onlyClient
        returns (uint)
    {
        thisProject.clientBalance += msg.value;
        return thisProject.clientBalance;
    }

    // @dev Used by client to withdraw funds from contract
    // @param _withdrawAmount amount client wants to withdraw
    function clientWithdrawal(uint _withdrawAmount)
        public
        payable
        onlyClient
        returns (uint)
    {
        require(thisProject.clientBalance >= _withdrawAmount, "Amount requested to withdraw is greater than current balance");
        thisProject.clientBalance -= _withdrawAmount;
        thisProject.client.transfer(_withdrawAmount);
        return thisProject.clientBalance;
    }

    /// @dev Used by service provider to withdraw funds from contract
    /// @param _withdrawAmount amount service provider wants to withdraw
    function serviceProviderWithdrawal(uint _withdrawAmount)
        public
        payable
        onlyServiceProvider
        returns (uint)
    {
        require(thisProject.serviceProviderBalance >= _withdrawAmount, "Amount requested to withdraw is greater than current balance");
        thisProject.serviceProviderBalance -= _withdrawAmount;
        serviceProvider.transfer(_withdrawAmount);
        return thisProject.serviceProviderBalance;
    }

    // @dev Used by service provider to define a phase of the project
    // @param _name name of the phase
    // @param _description description of the phase
    // @param _lockedPayment amount that service provider earns even if phase cancelled by client
    // @param _discretionaryPayment refunded to client if phase is cancelled
    function createPhase(string memory _name, string memory _description, uint _lockedPayment, uint _discretionaryPayment)
        public
        onlyServiceProvider
        phaseStructureNotApproved
        returns(uint)
    {
        Phase storage newPhase = thisProject.phases[idGenerator];
        newPhase.name = _name;
        newPhase.description = _description;
        newPhase.lockedPayment = _lockedPayment;
        newPhase.discretionaryPayment = _discretionaryPayment;
        idGenerator++;
        thisProject.phaseExists = true;
        return idGenerator - 1;
    }

    // @dev Provides information on the current project
    function readProject()
        public
        view
        returns(string memory name, string memory description, address client, uint currentPhase, uint serviceProviderBalance, uint escrowBalance, uint clientBalance, bool clientApprovedPhaseStructure, bool projectCancelled, bool projectCompleted, bool phaseExists)
    {
        name = thisProject.name;
        description = thisProject.description;
        client = thisProject.client;
        currentPhase = thisProject.currentPhase;
        serviceProviderBalance = thisProject.serviceProviderBalance;
        escrowBalance = thisProject.escrowBalance;
        clientBalance = thisProject.clientBalance;
        clientApprovedPhaseStructure = thisProject.clientApprovedPhaseStructure;
        projectCancelled = thisProject.projectCancelled;
        projectCompleted = thisProject.projectCompleted;
        phaseExists = thisProject.phaseExists;
        return(name, description, client, currentPhase, serviceProviderBalance,
            escrowBalance, clientBalance, clientApprovedPhaseStructure,
            projectCancelled, projectCompleted, phaseExists);
    }

     // @dev Provides information on a phase of the project
     // @param phase of the project for which information is request
    function readPhase(uint _phase)
        public
        view
        returns(string memory name, string memory description, uint lockedPayment, uint discretionaryPayment, bool phaseStarted, bool clientApproved)
    {
        name = thisProject.phases[_phase].name;
        description = thisProject.phases[_phase].description;
        lockedPayment = thisProject.phases[_phase].lockedPayment;
        discretionaryPayment = thisProject.phases[_phase].discretionaryPayment;
        phaseStarted = thisProject.phases[_phase].phaseStarted;
        clientApproved = thisProject.phases[_phase].clientApproved;

        return(name, description, lockedPayment, discretionaryPayment, phaseStarted, clientApproved);
    }

    // @dev Executed by service provider to start the next phase of the project
    function serviceProviderStartNextPhase()
        public
        onlyServiceProvider
        returns(uint)
    {
        require(thisProject.phases[thisProject.currentPhase].clientApproved == true || (thisProject.currentPhase == 0),
            "Previous phase must be completed");
        require(thisProject.projectCompleted == false, "Project has already been completed");
        require(thisProject.projectCancelled == false, "Project has been cancelled");
        uint nextPhase = (thisProject.currentPhase + 1);
        require(thisProject.clientBalance >= thisProject.phases[nextPhase].lockedPayment + thisProject.phases[nextPhase].discretionaryPayment,
            "Client balance is not sufficient to begin this phase");
        thisProject.currentPhase = nextPhase;
        thisProject.clientBalance -= thisProject.phases[nextPhase].lockedPayment + thisProject.phases[nextPhase].discretionaryPayment;
        thisProject.escrowBalance += thisProject.phases[nextPhase].lockedPayment + thisProject.phases[nextPhase].discretionaryPayment;
        thisProject.phases[thisProject.currentPhase].phaseStarted = true;
        return thisProject.currentPhase;
    }

    // @dev Executed by client to approve and finalize the phase structure of the project.
    function approvePhaseStructure()
        public
        onlyClient
        returns(bool)
    {
        require(thisProject.phaseExists == true,"No phases have been created yet");
        require(thisProject.clientApprovedPhaseStructure == false,"The client has already approved the phase structure");
        thisProject.clientApprovedPhaseStructure = true;
        return thisProject.clientApprovedPhaseStructure;
    }

     // @dev Used by client to approve and finalize the current phase
    function approvePhase()
        public
        onlyClient
        returns(bool)
    {
        require(thisProject.phases[thisProject.currentPhase].clientApproved == false,"Client has already approved current phase");
        require(thisProject.phases[thisProject.currentPhase].phaseStarted == true,"This phase has not been started so it cannot be approved");
        thisProject.phases[thisProject.currentPhase].clientApproved = true;
        thisProject.serviceProviderBalance += thisProject.phases[thisProject.currentPhase].lockedPayment;
        thisProject.serviceProviderBalance += thisProject.phases[thisProject.currentPhase].discretionaryPayment;
        thisProject.escrowBalance -= thisProject.phases[thisProject.currentPhase].lockedPayment;
        thisProject.escrowBalance -= thisProject.phases[thisProject.currentPhase].discretionaryPayment;
        // @dev If the current phase is the last phase of the project then project is finished
        if (thisProject.currentPhase == (idGenerator - 1))
        {
            thisProject.projectCompleted = true;
        }
        return thisProject.phases[thisProject.currentPhase].clientApproved;
    }

    // @dev Used by client or service provider to cancel the project
    function cancelProject()
        public
        returns(bool)
    {
        require(msg.sender == thisProject.client || msg.sender == serviceProvider, "Contract can only be cancelled by client or service provider");
        if (msg.sender == thisProject.client)
        {
            thisProject.serviceProviderBalance += thisProject.phases[thisProject.currentPhase].lockedPayment;
            thisProject.escrowBalance -= thisProject.phases[thisProject.currentPhase].lockedPayment;
            thisProject.clientBalance += thisProject.phases[thisProject.currentPhase].discretionaryPayment;
            thisProject.escrowBalance -= thisProject.phases[thisProject.currentPhase].discretionaryPayment;
        }
        if (msg.sender == serviceProvider)
        {
            thisProject.clientBalance += thisProject.phases[thisProject.currentPhase].lockedPayment;
            thisProject.escrowBalance -= thisProject.phases[thisProject.currentPhase].lockedPayment;
            thisProject.clientBalance += thisProject.phases[thisProject.currentPhase].discretionaryPayment;
            thisProject.escrowBalance -= thisProject.phases[thisProject.currentPhase].discretionaryPayment;
        }
        thisProject.projectCancelled = true;
        return thisProject.projectCancelled;
    }
}
