import React, { Component } from "react";

// @dev This component displays the status of the project on the user interface
class ProjectInfo extends Component {
    render() {
        return (
           <div>
                <h2>Overview of current project: {this.props.project.name}</h2>
                 <p>
                    Project Description: {this.props.project.description}<br/>
                    Client: {this.props.project.client}<br/>
                    Current phase: {this.props.project.currentPhase}<br/>
                    Service provider balance: {this.props.project.serviceProviderBalance}<br/>
                    Client balance: {this.props.project.clientBalance}<br/>
                    Escrow balance: {this.props.project.escrowBalance}<br/>
                    Client approved phase structure: {String(this.props.project.clientApprovedPhaseStructure)}<br/>
                    Project cancelled: {String(this.props.project.projectCancelled)}<br/>
                    Project completed: {String(this.props.project.projectCompleted)}<br/>
                    Phase exists: {String(this.props.project.phaseExists)}<br/>
                </p>
           </div>
        )
    }
}
  
export default ProjectInfo 