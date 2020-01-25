import React from "react";

class Test extends React.Component { 
    constructor(props) { 
        super(props); 
        this.state = {} 
    } 

    static getDerivedStateFromProps(nextProps) {    
        return {
          phaseStructure: nextProps.phaseStructure,
        }
      }

      defineHeaders() {
        return (
            <tr>
                <td>Number</td>
                <td>Name</td>
                <td>Description</td>
                <td>Initial Payment</td>
                <td>Final Payment</td>
                <td>Phase Started</td>
                <td>Client Approved</td>
            </tr>
        )
    }

      definePhaseTable() {
        const phaseStructure = this.state.phaseStructure;
        return phaseStructure.map(phase => (
            <tr key={phase.id}>
                <td>{phase.id}</td>
                <td>{phase.name}</td>
                <td>{phase.description}</td>
                <td>{phase.initialPayment}</td>
                <td>{phase.finalPayment}</td>
                <td>{String(phase.phaseStarted)}</td>
                <td>{String(phase.clientApproved)}</td>
            </tr>
            ));
    }
    
    render() { 
        console.log('Value of Prop - ', this.props.phaseStructure); 
        console.log('Value of State - ', this.state.phaseStructure) 
        return (
            <div>
                <table id='phaseStructure'>
                    <tbody>
                        {this.defineHeaders()}
                        {this.definePhaseTable()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Test;