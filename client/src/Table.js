import React, { Component } from "react";




class Table extends Component {
   constructor(props) {
      super(props)
      this.state = {
         students: [
            { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
            { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
            { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
            { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
         ]
      }
   }

   renderTableHeader() {
      let header = Object.keys(this.state.students[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

   renderTableData() {
      return this.state.students.map((student, index) => {
         const { id, name, age, email } = student //destructuring
         return (
            <tr key={id}>
               <td>{id}</td>
               <td>{name}</td>
               <td>{age}</td>
               <td>{email}</td>
            </tr>
         )
      })
   }

   render() {
      return (
         <div>
            <h1 id='title'>React Dynamic Table</h1>
            <table id='students'>
               <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
      )
   }
}

export default Table 

renderTableHeader() {
   let header = Object.keys(this.state.phaseStructure[0])
   return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
   })
}

renderTableData() {
   return this.state.phaseStructure.map((phase, index) => {
      const { name, description, initialPayment, finalPayment, phaseStarted, phaseApproved } = phase //destructuring
      return (
         <tr key={name}>
            <td>{name}</td>
            <td>{description}</td>
            <td>{initialPayment}</td>
            <td>{finalPayment}</td>
            <td>{phaseStarted}</td>
            <td>{phaseApproved}</td>
         </tr>
      )
   })
}
            <div>
            <table id='phaseStructure'>
               <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
            </div>
