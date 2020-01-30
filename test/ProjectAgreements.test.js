var ProjectAgreements = artifacts.require('ProjectAgreements')
let catchRevert = require("./exceptionsHelpers.js").catchRevert
const BN = web3.utils.BN


contract('ProjectAgreements', function(accounts) {

    const firstAccount = accounts[0]
    const secondAccount = accounts[1]
    const name = "Sample Project"
    const description = "This project is designed for testing."
    const serviceProvider = firstAccount
    const client = secondAccount
    let instance

    beforeEach(async () => {
        instance = await ProjectAgreements.new(name, description, client, {from: serviceProvider})
    })

    describe("Setup", async() => {
        it("Deploying address should be the service provider", async() => {
            const serviceProviderInContract = await instance.serviceProvider()
            assert.equal(serviceProviderInContract, firstAccount, "the deploying address should be the service provider")            
        })
        it("The second account should be the client", async() => {
            const project = await instance.readProject()
            assert.equal(project.client, client, "the client should be the second account")            
        })
        it("The name of the project should be entered correctly", async() => {
            const project = await instance.readProject()
            assert.equal(project.name, "Sample Project", "the event should be Sample Project")
        })

    })

    describe("Deposits", async() => {
        it("client should be able to make deposit", async() => {
            await instance.deposit({from: client, value: 5})
            const project = await instance.readProject()
            assert.equal(project.clientBalance, 5, "the client balance should be 5")
        })
        it("client should be able to make withdrawal", async() => {
            await instance.deposit({from: client, value: 5})
            await instance.clientWithdrawal(3, {from: client})
            const project = await instance.readProject()
            assert.equal(project.clientBalance, 2, "after withdrawal the client balance should be 2")
        })
       it("client should not be able to withdraw more than it has in its balance", async() => {
            await instance.deposit({from: client, value: 5})
            await instance.clientWithdrawal(3, {from: client})
            await catchRevert(instance.clientWithdrawal(3, {from: client}))   
        })
        it("service provider should not be able to withdraw with zero balance", async() => {
            await instance.deposit({from: client, value: 5})
            await catchRevert(instance.serviceProviderWithdrawal(3, {from: serviceProvider}))   
        })
    })

    describe("Defining Project", async() => {
        it("service provider should be able to create phase", async() => {
            await instance.createPhase("Definition", "Create flow chart of entire project", 5, 15, {from: serviceProvider})
            const phase = await instance.readPhase(1)
            assert.equal(phase.initialPayment, 5, "the initial payment for the phase should be 5")
        })
        it("service provider should be able to create another phase", async() => {
            await instance.createPhase("Definition", "Create flow chart of entire project", 5, 15, {from: serviceProvider})
            await instance.createPhase("Smart contracts", "Create smart contracts for project", 15, 45, {from: serviceProvider})
            const phase = await instance.readPhase(2)
            assert.equal(phase.description, "Create smart contracts for project", "the project description is not correct")
        })
        it("client should be able to approve phase structure", async() => {
            await instance.createPhase("Definition", "Create flow chart of entire project", 5, 15, {from: serviceProvider})
            await instance.createPhase("Smart contracts", "Create smart contracts for project", 15, 45, {from: serviceProvider})
            await instance.approvePhaseStructure({from: client})
            const project = await instance.readProject()
            assert.equal(project.clientApprovedPhaseStructure, true, "the phase structure is not approved")
        })
    })

    describe("Project Execution", async() => {
        it("service provider should not be able to start phase without sufficient client deposit", async() => {
            await instance.createPhase("Definition", "Create flow chart of entire project", 1, 4, {from: serviceProvider})
            await instance.createPhase("Smart contracts", "Create smart contracts for project", 2, 8, {from: serviceProvider})
            await instance.approvePhaseStructure({from: client})
            await catchRevert(instance.serviceProviderStartNextPhase({from: serviceProvider}))   
        })
        it("service provider should be able to start next phase after client deposit", async() => {
            await instance.createPhase("Definition", "Create flow chart of entire project", 1, 4, {from: serviceProvider})
            await instance.createPhase("Smart contracts", "Create smart contracts for project", 2, 8, {from: serviceProvider})
            await instance.approvePhaseStructure({from: client})
            await instance.deposit({from: client, value: 20})
            await instance.serviceProviderStartNextPhase({from: serviceProvider})  
            const phase = await instance.readPhase(1)
            assert.equal(phase.phaseStarted, true, "the phase was not started")
        })
        it("client can approve phase", async() => {
            await instance.createPhase("Definition", "Create flow chart of entire project", 1, 4, {from: serviceProvider})
            await instance.createPhase("Smart contracts", "Create smart contracts for project", 2, 8, {from: serviceProvider})
            await instance.approvePhaseStructure({from: client})
            await instance.deposit({from: client, value: 20})
            await instance.serviceProviderStartNextPhase({from: serviceProvider})  
            await instance.approvePhase({from: client})
            phase = await instance.readPhase(1)
            assert.equal(phase.clientApproved, true, "the phase was not approved")
        })
        it("after phase approval service provider can withdraw funds", async() => {
            await instance.createPhase("Definition", "Create flow chart of entire project", 1, 4, {from: serviceProvider})
            await instance.createPhase("Smart contracts", "Create smart contracts for project", 2, 8, {from: serviceProvider})
            await instance.approvePhaseStructure({from: client})
            await instance.deposit({from: client, value: 20})
            await instance.serviceProviderStartNextPhase({from: serviceProvider})  
            await instance.approvePhase({from: client})
            await instance.serviceProviderWithdrawal(4, {from: serviceProvider}) 
            const project = await instance.readProject()
            assert.equal(project.serviceProviderBalance, 1, "service provider balance should be 1 after withdrawal")
        })
        it("project should be completed when last phase is approved", async() => {
            await instance.createPhase("Definition", "Create flow chart of entire project", 1, 4, {from: serviceProvider})
            await instance.createPhase("Smart contracts", "Create smart contracts for project", 2, 8, {from: serviceProvider})
            await instance.approvePhaseStructure({from: client})
            await instance.deposit({from: client, value: 20})
            await instance.serviceProviderStartNextPhase({from: serviceProvider})  
            await instance.approvePhase({from: client})
            await instance.serviceProviderStartNextPhase({from: serviceProvider})  
            await instance.approvePhase({from: client})
            project = await instance.readProject()
            assert.equal(project.projectCompleted, true, "the project was not completed")
        })
    })

    describe("Edge Cases", async() => {
        it("service provider cannot withdraw more funds than balance", async() => {
            await instance.createPhase("Definition", "Create flow chart of entire project", 1, 4, {from: serviceProvider})
            await instance.createPhase("Smart contracts", "Create smart contracts for project", 2, 8, {from: serviceProvider})
            await instance.approvePhaseStructure({from: client})
            await instance.deposit({from: client, value: 20})
            await instance.serviceProviderStartNextPhase({from: serviceProvider})  
            await instance.approvePhase({from: client})
            await catchRevert(instance.serviceProviderWithdrawal(6, {from: serviceProvider}))   
        })
        it("cancellation of project by client should result in correct balances", async() => {
            await instance.createPhase("Definition", "Create flow chart of entire project", 1, 4, {from: serviceProvider})
            await instance.createPhase("Smart contracts", "Create smart contracts for project", 2, 8, {from: serviceProvider})
            await instance.approvePhaseStructure({from: client})
            await instance.deposit({from: client, value: 20})
            await instance.serviceProviderStartNextPhase({from: serviceProvider})  
            await instance.approvePhase({from: client})
            await instance.serviceProviderStartNextPhase({from: serviceProvider})  
            await instance.cancelProject({from: client})
            const project = await instance.readProject()
            assert.equal(project.serviceProviderBalance, 7, "service provider balance should equal 7 after client cancellation")
        })
        it("cancellation of project by service provider should result in correct balances", async() => {
            await instance.createPhase("Definition", "Create flow chart of entire project", 1, 4, {from: serviceProvider})
            await instance.createPhase("Smart contracts", "Create smart contracts for project", 2, 8, {from: serviceProvider})
            await instance.approvePhaseStructure({from: client})
            await instance.deposit({from: client, value: 20})
            await instance.serviceProviderStartNextPhase({from: serviceProvider})  
            await instance.approvePhase({from: client})
            await instance.serviceProviderStartNextPhase({from: serviceProvider})  
            await instance.cancelProject({from: serviceProvider})
            const project = await instance.readProject()
            assert.equal(project.serviceProviderBalance, 5, "service provider balance should equal 5 after service provider cancellation")
        })
        it("should not be able to start next phase if project cancelled", async() => {
            await instance.createPhase("Definition", "Create flow chart of entire project", 1, 4, {from: serviceProvider})
            await instance.createPhase("Smart contracts", "Create smart contracts for project", 2, 8, {from: serviceProvider})
            await instance.approvePhaseStructure({from: client})
            await instance.deposit({from: client, value: 20})
            await instance.serviceProviderStartNextPhase({from: serviceProvider})  
            await instance.approvePhase({from: client})
            await instance.cancelProject({from: serviceProvider})
            await catchRevert(instance.serviceProviderStartNextPhase({from: client}))   
        })
    })
})