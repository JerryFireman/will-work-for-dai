import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import Header from "./Header.js";
import ProjectInfo from "./ProjectInfo.js";
import PhaseStructure from "./PhaseStructure.js"
import CreatePhase from "./CreatePhase.js"
import ClientDashboard from "./ClientDashboard.js"
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props)
    this.definePhase = this.definePhase.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getPhaseStructure = this.getPhaseStructure.bind(this)
    this.approvePhaseStructure = this.approvePhaseStructure.bind(this)

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
    project: {}
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state.
      this.setState({ web3, accounts, contract: instance });
      // Call readProject() to obtain project information and add to state
      const project = await instance.methods.readProject().call();
      this.setState({project: project})
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
  definePhase = async (event) => {
    event.preventDefault()
    const { accounts, contract } = this.state;
    await contract.methods.createPhase(this.state.phaseName, this.state.phaseDescription, this.state.initialPayment, this.state.finalPayment).send({ from: accounts[0], gas: 3000000 });
    this.getPhaseStructure()
    this.setState({
      phaseName: "",
      phaseDescription: "",
      initialPayment: 0,
      finalPayment: 0        
    })
  };

  //Executed to retrieve the current phase structure 
  getPhaseStructure = async () => {
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
        phaseArray.push(phase);
      }
    }
    this.setState({
      phaseStructure: phaseArray
    });
    return phaseArray
   }
   
  approvePhaseStructure = async (event) => {
    event.preventDefault()
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

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value });
  }
 
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Header/>
        <ProjectInfo project={this.state.project}/>
        <PhaseStructure phaseStructure={this.state.phaseStructure} project={this.state.project}/>
        <CreatePhase handleChange={this.handleChange} definePhase={this.definePhase}  phaseName={this.state.phaseName} phaseDescription={this.state.phaseDescription} initialPayment={this.state.initialPayment} finalPayment={this.state.finalPayment} />
        <ClientDashboard approvePhaseStructure={this.approvePhaseStructure}/>
      </div>
    );
  }
}

export default App;
