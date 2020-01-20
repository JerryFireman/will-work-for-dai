import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props)
    this.setValue = this.setValue.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  
  state = { 
    web3: null,
    accounts: null,
    contract: null,
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

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  setValue = async (event) => {
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
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Define new phase</h2> 
        <p>
          Enter parameters below and press submit to define new phase 
       </p>
        <form>
          <label>
            Phase name:
            <input type="text" name="phaseName" onChange={this.handleChange} />            
          </label>
        <button value="Submit" onClick={this.setValue} >Submit </button>
        </form>

        
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;