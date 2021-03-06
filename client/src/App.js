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
    lockedPayment: 0,
    discretionaryPayment: 0,
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
      this.setState({serviceProvider: serviceProvider})

      // @dev Call readProject() to obtain project information and add to state
      const project = await instance.methods.readProject().call();
      this.setState({project: project})
      var clientBalance = this.state.project.clientBalance;
      clientBalance = web3.utils.fromWei(clientBalance, 'ether');
      clientBalance = parseFloat(clientBalance).toFixed(4);
      var escrowBalance = this.state.project.escrowBalance;
      escrowBalance = web3.utils.fromWei(escrowBalance, 'ether');
      escrowBalance = parseFloat(escrowBalance).toFixed(4);
      var serviceProviderBalance = this.state.project.serviceProviderBalance;
      serviceProviderBalance = web3.utils.fromWei(serviceProviderBalance, 'ether');
      serviceProviderBalance = parseFloat(serviceProviderBalance).toFixed(4);
      this.setState(prevState => {
        let project = Object.assign({}, prevState.project);
        project.clientBalance = clientBalance;
        project.escrowBalance = escrowBalance;
        project.serviceProviderBalance = serviceProviderBalance;
        return { project };
      })

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
    var lockedPayment = this.state.lockedPayment;
    lockedPayment = String(lockedPayment)
    lockedPayment = web3.utils.toWei(lockedPayment,"ether")
    lockedPayment = String(lockedPayment)
    var discretionaryPayment = this.state.discretionaryPayment;
    discretionaryPayment = String(discretionaryPayment)
    discretionaryPayment = web3.utils.toWei(discretionaryPayment,"ether")
    discretionaryPayment = String(discretionaryPayment)
    await contract.methods.createPhase(this.state.phaseName, this.state.phaseDescription, lockedPayment, discretionaryPayment).send({ from: accounts[0], gas: 3000000 });
    this.setState({
      phaseName: "",
      phaseDescription: "",
      lockedPayment: 0,
      discretionaryPayment: 0        
    })
  };

  //Executed by the client to deposit funds into contract                 
    deposit = async () => {
      const { accounts, contract, web3 } = this.state;
      try {
          await contract.methods.deposit().send({from: accounts[1], gas: 3000000, value: String(web3.utils.toWei(this.state.depositAmount,"ether"))});
          this.setState({
            depositAmount: 0
          });

      } catch (error) {
        alert(
          `Deposit into contract failed. Check console for details.`,
        );
        console.error(error);
      }
    }

    // @dev Executed by client to withdraw funds from contract
    clientWithdrawal = async () => {
      const { accounts, contract, web3 } = this.state;
      var clientWithdrawalAmount = this.state.clientWithdrawalAmount
      clientWithdrawalAmount = String(clientWithdrawalAmount)
      clientWithdrawalAmount = web3.utils.toWei(clientWithdrawalAmount,"ether")
      clientWithdrawalAmount = String(clientWithdrawalAmount)
      try {
        await contract.methods.clientWithdrawal(clientWithdrawalAmount).send({ from: accounts[1], gas: 3000000 });
        this.setState({
          clientWithdrawalAmount: 0
        });
      } catch (error) {
        alert(
            `Attempt by client to withdraw funds returned error. Check console for details.`,
        );
        console.error(error);
      }

      // Call readProject() to obtain project information and add to state
      const project = await contract.methods.readProject().call();
      this.setState({project: project})
    };

    // @dev Executed by service provider to withdraw funds from contract
    serviceProviderWithdrawal = async () => {
      const { accounts, contract, web3 } = this.state;
      var serviceProviderWithdrawalAmount = this.state.serviceProviderWithdrawalAmount
      serviceProviderWithdrawalAmount = String(serviceProviderWithdrawalAmount)
      serviceProviderWithdrawalAmount = web3.utils.toWei(serviceProviderWithdrawalAmount,"ether")
      serviceProviderWithdrawalAmount = String(serviceProviderWithdrawalAmount)
      try {
        //await contract.methods.clientWithdrawal(String(this.state.serviceProviderWithdrawalAmount)).send({ from: accounts[1], gas: 3000000 });
        await contract.methods.serviceProviderWithdrawal(serviceProviderWithdrawalAmount).send({ from: accounts[0], gas: 3000000 });
        this.setState({
          serviceProviderWithdrawalAmount: 0
        });
      } catch (error) {
        alert(
          `Attempt by service provider to withdraw funds returned error. Check console for details.`,
        );
        console.error(error);
      }
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
        var ip = phase.lockedPayment
        ip = web3.utils.fromWei(ip, 'ether');
        ip = parseFloat(ip).toFixed(4);
        phase.lockedPayment = ip
        console.log("phase", phase)
        var fp = phase.discretionaryPayment
        fp = web3.utils.fromWei(fp, 'ether');
        fp = parseFloat(fp).toFixed(4);
        phase.discretionaryPayment = fp
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

  // @dev Watch for user keystrokes and update state
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
          lockedPayment={this.state.lockedPayment} 
          discretionaryPayment={this.state.discretionaryPayment}
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
