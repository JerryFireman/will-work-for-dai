import React from "react";

// @dev This component delivers the service provider dashboard portion of the user interface
class ServiceProviderDashboard extends React.Component { 
    render() { 
        const buttonStyle = {
            height: "75px", 
            width: "100px",
            fontSize: "14px"
        } 
        return (
            <div>
                <h2>Service provider dashboard</h2>
                <form>
                <br/>
                    <label>
                        Enter amount of funds to withdraw:
                        <br/>
                        <input type="number" name="serviceProviderWithdrawalAmount" value={this.props.serviceProviderWithdrawalAmount} onChange={this.props.handleChange} />            
                    </label>
                        <br/>
                </form>
                <button style={buttonStyle} onClick={this.props.serviceProviderWithdrawal} >Withdraw funds </button>
               <br/>
                <br/>
                <button style={buttonStyle} onClick={this.props.startPhase} >Start phase</button>
                <br/>
                <br/>
                <button style={buttonStyle} onClick={this.props.serviceProviderCancelProject} >Cancel project</button>
         </div>

        )
    }
}

export default ServiceProviderDashboard;