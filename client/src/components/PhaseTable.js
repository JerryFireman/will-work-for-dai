import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function PhaseTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Phase description</strong></TableCell>
            <TableCell align="right"><strong>Initial Payment</strong></TableCell>
            <TableCell align="right">Final Payment</TableCell>
            <TableCell align="right">Started</TableCell>
            <TableCell align="right">Approved</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.phaseStructure.map(phase => (
            <TableRow key={phase.id}>
              <TableCell component="th" scope="row">
                {phase.name}
              </TableCell>
              <TableCell align="right">{phase.initialPayment}</TableCell>
              <TableCell align="right">{phase.finalPayment}</TableCell>
              <TableCell align="right">{String(phase.phaseStarted)}</TableCell>
              <TableCell align="right">{String(phase.clientApproved)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
