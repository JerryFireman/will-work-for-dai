import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
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
    finalPayment: 0
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
    console.log("Submit: " + this.state.phaseName)
    event.preventDefault()
  };

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
          <p>
            Enter parameters below and press submit to define new phase 
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
        <button onClick={this.definePhase} >Define new phase </button>

          </div>
        </form>
      </div>
    );
  }
}

export default App;