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
                <p>test here</p>
                {this.definePhaseTable()}
            </div>
        )
    }
}

export default Test;