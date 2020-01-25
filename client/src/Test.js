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

    definePhase() {
        const phaseStructure = this.state.phaseStructure;
        return phaseStructure.map(phase => (
            <p>{phase.description}</p>
            ));
    }
    
    render() { 
        console.log('Value of Prop - ', this.props.phaseStructure); 
        console.log('Value of State - ', this.state.phaseStructure) 
        return (
            <div>
                <p>test here</p>
                {this.definePhase()}
            </div>
        )
    }
}

export default Test;