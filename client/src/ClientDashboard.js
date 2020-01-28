import React from "react";

class ClientDashboard extends React.Component { 
    render() { 
        const buttonStyle = {
            height: "75px", 
            width: "100px",
            fontSize: "14px"
        } 
        return (
            <div>
                <h2>Client dashboard</h2>
                <form onSubmit={this.props.deposit}>
                    <label>
                        Enter amount of funds to deposit:
                        <br/>
                        <input type="number" name="depositAmount" value={this.props.depositAmount} onChange={this.props.handleChange} />            
                    </label>
                        <br/>
                </form>
                <button style={buttonStyle} onClick={this.props.deposit} >Deposit funds </button>
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
                <button style={buttonStyle} onClick={this.props.deposit} >Deposit funds </button>
                <br/>
           </div>

        )
    }
}

export default ClientDashboard;