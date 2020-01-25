import React from "react";

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
                <td><strong>Number</strong></td>
                <td><strong>Name</strong></td>
                <td><strong>Description</strong></td>
                <td><strong>Initial Payment</strong></td>
                <td><strong>Final Payment</strong></td>
                <td><strong>Phase Started</strong></td>
                <td><strong>Client Approved</strong></td>
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
                <h2>Phase structure of this project</h2>
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

export default PhaseStructure;


// move to PhaseStructure file, delete test
// check that table updates when new phase is created
// remove console.logs
// when fixing define new phase, button should reset form

