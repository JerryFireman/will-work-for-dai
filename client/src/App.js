import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Table from "./Table.js"
import getWeb3 from "./getWeb3";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props)
    this.definePhase = this.definePhase.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  
  state = { 
    web3: null,
    accounts: null,
    contract: null,
    projectName: "",
    projectDescription: "",
    storageValue: 0,
    phaseName: "",
    phaseDescription: "",
    initialPayment: 0,
    finalPayment: 0,
    phaseStructure: []
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
      this.setState({projectName: project.name, projectDescription: project.description })  
      this.getPhaseStructure()
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

    // Defines a new phase of the project
    await contract.methods.createPhase(this.state.phaseName, this.state.phaseDescription, this.state.initialPayment, this.state.finalPayment).send({ from: accounts[0], gas: 3000000 });

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
        phaseArray.push(phase);
      }
    }
    console.log(phaseArray)
    this.setState({ phaseStructure: phaseArray });
    console.log(this.state.phaseStructure)
    
  } 
  
  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.name + ": " + event.target.value);
  }
 
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>SimpleAgreement</h1>
        <div>Harnessing the blockchain to easily create smart contracts for service providers</div>
        <h2>{this.state.projectName}</h2> 
          <p>
            {this.state.projectDescription}
          </p>
          <div>
            <h1 id='title'>Current Phase Structure</h1>
            <Table />
         </div>

          <p>
            Enter parameters and press button below to define new phase 
          </p>
        <form>
          <div>
            <label>
              Phase name:
              <input type="text" name="phaseName" onChange={this.handleChange} />            
            </label>
          </div>
          <div>
            <label>
              Phase description:
              <input type="text" name="phaseDescription" onChange={this.handleChange} />            
            </label>
          </div>
          <div>
            <label>
              Initial payment:
              <input type="number" name="initialPayment" onChange={this.handleChange} />            
            </label>
          </div>
          <div>
            <label>
              Final payment:
              <input type="number" name="finalPayment" onChange={this.handleChange} />            
            </label>
          </div>
          <div>
            <button onClick={this.definePhase} >Define new phase </button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;