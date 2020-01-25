import React from "react";

class CreatePhase extends React.Component {
    render() {
        const buttonStyle = {
            height: "50px", 
            width: "100px",
            fontSize: "14px"
        } 
        return (
        <div>
            <p>
                Enter parameters and press button below to define new phase 
            </p>
        <form>
          <div>
            <label>
              Phase name:
              <input type="text" name="phaseName" value={this.props.phaseName} onChange={this.props.handleChange} />            
            </label>
          </div>
          <div>
            <label>
              Phase description:
              <input type="text" name="phaseDescription" value={this.props.phaseDescription} onChange={this.props.handleChange} />            
            </label>
          </div>
          <div>
            <label>
              Initial payment:
              <input type="number" name="initialPayment" value={this.props.initialPayment} onChange={this.props.handleChange} />            
            </label>
          </div>
          <div>
            <label>
              Final payment:
              <input type="number" name="finalPayment" value={this.props.finalPayment} onChange={this.props.handleChange} />            
            </label>
          </div>
          <div>
          <br/><button style={buttonStyle} onClick={this.props.definePhase} >Define new phase </button>
          </div>
        </form>
            </div>
        )
    }


}

export default CreatePhase;

// reset form after create new phase
// center table