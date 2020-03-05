import React, { Component } from "react";
import WillWorkForDaiContract from "./contracts/WillWorkForDai.json";
import getWeb3 from "./getWeb3";
import Dashboards from './components/Dashboards.js';
import Header from "./components/Header.js";
import NavBar from './components/NavBar.js';
import PhaseTable from './components/PhaseTable.js';
import ProjectOverview from "./components/ProjectOverview.js";
import "./App.css";

// @dev main app that controls user interface
class App extends Component {
  constructor(props) {
    super(props)
    this.definePhase = this.definePhase.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getPhaseStructure = this.getPhaseStructure.bind(this)
    this.approvePhaseStructure = this.approvePhaseStructure.bind(this)
    this.deposit = this.deposit.bind(this)
    this.clientWithdrawal = this.clientWithdrawal.bind(this)


  }
  
  state = { 
    web3: null,
    accounts: null,
    contract: null,
    instance: null,
    storageValue: 0,
    phaseName: "",
    phaseDescription: "",
    initialPayment: 0,
    finalPayment: 0,
    phaseStructure: [],
    project: {},
    depositAmount: 0,
    clientWithdrawalAmount: 0,
    serviceProviderWithdrawalAmount: 0,
    serviceProvider: ""
  };

  componentDidMount = async () => {
    try {

      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = WillWorkForDaiContract.networks[networkId];
      const instance = new web3.eth.Contract(
        WillWorkForDaiContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      // Set web3, accounts, and contract to the state.
      this.setState({ web3, accounts, contract: instance });

         // @dev call getter function to obtain serviceProvider address
        const serviceProvider = await instance.methods.serviceProvider().call();
        console.log("serviceProvider:", serviceProvider)
        this.setState({serviceProvider: serviceProvider})

      // Call readProject() to obtain project information and add to state
      const project = await instance.methods.readProject().call();
      this.setState({project: project})
      var clientBalance = this.state.project.clientBalance;
      clientBalance = web3.utils.fromWei(clientBalance, 'ether');
      clientBalance = parseFloat(clientBalance).toFixed(4);
      var escrowBalance = this.state.project.escrowBalance;
      escrowBalance = web3.utils.fromWei(escrowBalance, 'ether');
      escrowBalance = parseFloat(escrowBalance).toFixed(4);
      console.log("escrowBalance before setState", escrowBalance);
      var serviceProviderBalance = this.state.project.serviceProviderBalance;
      serviceProviderBalance = web3.utils.fromWei(serviceProviderBalance, 'ether');
      serviceProviderBalance = parseFloat(serviceProviderBalance).toFixed(4);
      console.log("serviceProviderBalance before setState", serviceProviderBalance);
      this.setState(prevState => {
        let project = Object.assign({}, prevState.project);
        project.clientBalance = clientBalance;
        project.escrowBalance = escrowBalance;
        project.serviceProviderBalance = serviceProviderBalance;
        return { project };
      })
      console.log("clientBalance from state after setState", this.state.project.clientBalance)
      console.log("escrow balance from state after setState",this.state.project.escrowBalance);
      console.log("service provider balance from state after setState",this.state.project.serviceProviderBalance);
      console.log("service provider",this.state.project.serviceProvider);

      await this.getPhaseStructure()
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  //Executed to define a new phase of the project
  definePhase = async () => {
    console.log("hit definePhase")
    const { accounts, contract, web3 } = this.state;
    var initialPayment = this.state.initialPayment;
    initialPayment = String(initialPayment)
    initialPayment = web3.utils.toWei(initialPayment,"ether")
    initialPayment = String(initialPayment)
    var finalPayment = this.state.finalPayment;
    finalPayment = String(finalPayment)
    finalPayment = web3.utils.toWei(finalPayment,"ether")
    finalPayment = String(finalPayment)
    await contract.methods.createPhase(this.state.phaseName, this.state.phaseDescription, initialPayment, finalPayment).send({ from: accounts[0], gas: 3000000 });
//    this.getPhaseStructure()
    this.setState({
      phaseName: "",
      phaseDescription: "",
      initialPayment: 0,
      finalPayment: 0        
    })
  };

  //Executed by the client to deposit funds into contract                 
      deposit = async () => {
        console.log("1")
        const { accounts, contract, web3 } = this.state;
        // let balance = await web3.eth.getBalance(accounts[1])
        // console.log("client balance", balance)
      try {
          await contract.methods.deposit().send({from: accounts[1], gas: 3000000, value: String(web3.utils.toWei(this.state.depositAmount,"ether"))});
          this.setState({
            depositAmount: 0
          });
          // Call readProject() to obtain project information and add to state
          const project = await contract.methods.readProject().call();
          this.setState({project: project})
          console.log("accounts 1 address", accounts[1])
          let balance = await web3.eth.getBalance(accounts[1])
          console.log("client wallet balance", balance)
          let conbalance = await web3.eth.getBalance("0x6F2b8204FDF7384926E1571f68571B5AC65714C0")
          console.log("contract balance", conbalance)
          console.log("client balance in contract", this.state.project.clientBalance)

        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
          `Deposit into contract failed. Check console for details.`,
        );
        console.error(error);
        }
      }

      // @dev Executed by client to withdraw funds from contract
      clientWithdrawal = async () => {
        const { accounts, contract, web3 } = this.state;
        console.log("hit client withdrawal!")
        var clientWithdrawalAmount = this.state.clientWithdrawalAmount
        clientWithdrawalAmount = String(clientWithdrawalAmount)
        clientWithdrawalAmount = web3.utils.toWei(clientWithdrawalAmount,"ether")
        clientWithdrawalAmount = String(clientWithdrawalAmount)
        console.log("clientWithdrawalAmount", clientWithdrawalAmount)
        try {
          //await contract.methods.clientWithdrawal(String(this.state.clientWithdrawalAmount)).send({ from: accounts[1], gas: 3000000 });
          await contract.methods.clientWithdrawal(clientWithdrawalAmount).send({ from: accounts[1], gas: 3000000 });
          this.setState({
            clientWithdrawalAmount: 0
          });
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Attempt by client to withdraw funds returned error. Check console for details.`,
          );
          console.error(error);
        }

          // Call readProject() to obtain project information and add to state
          const project = await contract.methods.readProject().call();
          this.setState({project: project})
          let balance = await web3.eth.getBalance(accounts[1])
          console.log("client wallet balance", balance)
          let conbalance = await web3.eth.getBalance("0x6F2b8204FDF7384926E1571f68571B5AC65714C0")
          console.log("contract balance", conbalance)
          console.log("client balance in contract", this.state.project.clientBalance)
        
      };

      // @dev Executed by service provider to withdraw funds from contract
      serviceProviderWithdrawal = async () => {
        const { accounts, contract, web3 } = this.state;
        console.log("hit service provider withdrawal!")
        var serviceProviderWithdrawalAmount = this.state.serviceProviderWithdrawalAmount
        serviceProviderWithdrawalAmount = String(serviceProviderWithdrawalAmount)
        serviceProviderWithdrawalAmount = web3.utils.toWei(serviceProviderWithdrawalAmount,"ether")
        serviceProviderWithdrawalAmount = String(serviceProviderWithdrawalAmount)
        console.log("serviceProviderWithdrawalAmount", serviceProviderWithdrawalAmount)
        try {
          //await contract.methods.clientWithdrawal(String(this.state.serviceProviderWithdrawalAmount)).send({ from: accounts[1], gas: 3000000 });
          await contract.methods.serviceProviderWithdrawal(serviceProviderWithdrawalAmount).send({ from: accounts[0], gas: 3000000 });
          this.setState({
            serviceProviderWithdrawalAmount: 0
          });
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Attempt by service provider to withdraw funds returned error. Check console for details.`,
          );
          console.error(error);
        }
          // Call readProject() to obtain project information and add to state
          const project = await contract.methods.readProject().call();
          this.setState({project: project})
          console.log("service provider: ",this.state.project.serviceProvider)
          let balance = await web3.eth.getBalance(accounts[1])
          console.log("client wallet balance", balance)
          let conbalance = await web3.eth.getBalance("0x6F2b8204FDF7384926E1571f68571B5AC65714C0")
          console.log("contract balance", conbalance)
          console.log("client balance in contract", this.state.project.clientBalance)
        
      };

  //Executed to retrieve the current phase structure 
  getPhaseStructure = async () => {
    const web3 = this.state.web3;
    const { contract } = this.state;
    const idGenerator = await contract.methods.idGenerator().call();
    var phaseArray = [];
    if (idGenerator >= 2) {
      for (let i = 1; i < idGenerator; i++) {
        var phase = await contract.methods.readPhase(i).call();
        delete phase[0];
        delete phase[1];
        delete phase[2];
        delete phase[3];
        delete phase[4];
        delete phase[5];
        phase.id = i
        console.log("phase", phase)
        var ip = phase.initialPayment
        ip = web3.utils.fromWei(ip, 'ether');
        ip = parseFloat(ip).toFixed(4);
        console.log("ip",ip)
        phase.initialPayment = ip
        console.log("phase", phase)
        var fp = phase.finalPayment
        fp = web3.utils.fromWei(fp, 'ether');
        fp = parseFloat(fp).toFixed(4);
        console.log("fp",fp)
        phase.finalPayment = fp
        phaseArray.push(phase);
      }
      
    }
    this.setState({
      phaseStructure: phaseArray
    });
    return phaseArray
   }
   
  // @dev Executed by client to approve phase structure
   approvePhaseStructure = async () => {
    const { accounts, contract } = this.state;
    try {
      const response = await contract.methods.approvePhaseStructure().send({ from: accounts[1], gas: 3000000 });
      if (response) {
        const project = await contract.methods.readProject().call();
        console.log("project.phaseExists",project.phaseExists)
        this.setState({project: project})
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Attempt to approve phase structure returned error. Check console for details.`,
      );
      console.error(error);
    }
  };

  // @dev Executed by client to approve current phase
  approvePhase = async () => {
    const { accounts, contract } = this.state;
    try {
      await contract.methods.approvePhase().send({ from: accounts[1], gas: 3000000 });
    } catch (error) {
      // Catch any errors for the above operation.
      alert(
        `Attempt by client to approve current phase failed. Check console for details.`,
      );
      console.error(error);
    }
  };

  // @dev Executed by client to cancel project
  clientCancelProject = async () => {
    const { accounts, contract } = this.state;
    try {
      await contract.methods.cancelProject().send({ from: accounts[1], gas: 3000000 });
    } catch (error) {
      // Catch any errors for the above operation.
      alert(
        `Attempt by client to cancel project failed. Check console for details.`,
      );
      console.error(error);
    }
  };

  // @dev Executed by service provider to cancel project
  serviceProviderCancelProject = async () => {
    const { accounts, contract } = this.state;
    try {
      await contract.methods.cancelProject().send({ from: accounts[0], gas: 3000000 });
    } catch (error) {
      // Catch any errors for the above operation.
      alert(
        `Attempt by service provider to cancel project failed. Check console for details.`,
      );
      console.error(error);
    }
  };

  // @dev Executed by service provider to start next phase of project
  startPhase = async () => {
    const { accounts, contract } = this.state;
    try {
      await contract.methods.serviceProviderStartNextPhase().send({ from: accounts[0], gas: 3000000 });
    } catch (error) {
      // Catch any errors for the above operation.
      alert(
        `Attempt by service provider to start next phase of project failed. Check console for details.`,
      );
      console.error(error);
    }
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
 
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Header project={this.state.project}/>
        <NavBar project={this.state.project}/>
        <ProjectOverview project={this.state.project} serviceProvider={this.state.serviceProvider}/>
        <PhaseTable 
          phaseStructure={this.state.phaseStructure}
        />
        <Dashboards 
          handleChange={this.handleChange} 
          approvePhaseStructure={this.approvePhaseStructure}
          depositAmount={this.state.depositAmount}
          deposit={this.deposit} 
          clientWithdrawalAmount={this.state.clientWithdrawalAmount}
          clientWithdrawal={this.clientWithdrawal}
          approvePhase={this.approvePhase} 
          clientCancelProject={this.clientCancelProject}
          phaseName={this.state.phaseName} 
          phaseDescription={this.state.phaseDescription} 
          initialPayment={this.state.initialPayment} 
          finalPayment={this.state.finalPayment}
          definePhase={this.definePhase} 
          serviceProviderWithdrawalAmount={this.state.serviceProviderWithdrawalAmount} 
          serviceProviderWithdrawal={this.serviceProviderWithdrawal} 
          startPhase={this.startPhase} 
          serviceProviderCancelProject={this.serviceProviderCancelProject} 
        />
      </div>
    );
  }
}

export default App;
