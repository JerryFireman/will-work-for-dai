import React from "react";

function PhaseStructure({ phaseStructure }) {
    return phaseStructure.map(phase => (
        <h1>{phase.name}</h1>
    ));
}

export default PhaseStructure 

