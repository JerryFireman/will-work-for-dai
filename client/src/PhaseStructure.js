import React from "react";

// @dev This component displays the phase structure of the project
class PhaseStructure extends React.Component { 
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
                <th><strong>Number</strong></th>
                <th><strong>Name</strong></th>
                <th><strong>Description</strong></th>
                <th><strong>Initial Payment</strong></th>
                <th><strong>Final Payment</strong></th>
                <th><strong>Phase Started</strong></th>
                <th><strong>Client Approved</strong></th>
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
       return (
            <div>
                <h2>Phase structure of this project</h2>
                <table align="center">
                    <tbody>
                        {this.defineHeaders()}
                        {this.definePhaseTable()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PhaseStructure;