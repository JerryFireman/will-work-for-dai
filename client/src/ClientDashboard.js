import React from "react";

class ClientDashboard extends React.Component { 
    constructor(props) { 
        super(props); 
        this.state = {} 
    } 

    render() { 
        const buttonStyle = {
            height: "75px", 
            width: "100px",
            fontSize: "14px"
        } 
        return (
            <div>
                <h2>Client dashboard</h2>
                <form>
                    <label>
                        Enter amount of funds to deposit:
                        <br/>
                        <input type="text" name="phaseName" value={this.props.phaseName} onChange={this.props.handleChange} />            
                    </label>
                    <span>
                        <br/>
                        <button style={buttonStyle} >Deposit funds </button>
                    </span>
                </form>
                <form>
                    <br/>
                    <label>
                        Enter amount of funds to withdraw:
                        <br/>
                        <input type="text" name="phaseName" value={this.props.phaseName} onChange={this.props.handleChange} />            
                    </label>
                    <span>
                        <br/>
                        <button style={buttonStyle} >Withdraw funds </button>
                    </span>
                </form>
                <br/>
                <button style={buttonStyle} onClick={this.props.approvePhaseStructure} >Approve phase structure </button>
                <button style={buttonStyle} >Approve current phase </button>
           </div>

        )
    }
}

export default ClientDashboard;