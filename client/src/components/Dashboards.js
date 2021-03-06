import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import StyledButton from './StyledButton';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Dashboards(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0} >
        <Grid item xs={6}>
          <Paper className={classes.paper} square={true} elevation={0}>
            <Box fontWeight="fontWeightBold" textAlign="left">    
              <Typography variant="h4" color="primary" >
                Client Dashboard
              </Typography><br/>
              <form className={classes.root} noValidate autoComplete="off">
                <StyledButton onClick={props.approvePhaseStructure}>
                  Approve phase structure
                </StyledButton>
              </form>
              <br/>
              <form className={classes.root} noValidate autoComplete="off">            
                <TextField 
                  id="filled-basic" 
                  label="Amount to Deposit" 
                  variant="filled" 
                  type="number" 
                  name="depositAmount" 
                  value={props.depositAmount} 
                  onChange={props.handleChange} 
                />
                <StyledButton onClick={props.deposit}>Deposit</StyledButton>
              </form>
              <br/>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField 
                  id="filled-basic" 
                  label="Amount to withdraw" 
                  variant="filled" 
                  type="number" 
                  name="clientWithdrawalAmount" 
                  value={props.clientWithdrawalAmount} 
                  onChange={props.handleChange}
                />
                <StyledButton onClick={props.clientWithdrawal}>Withdraw</StyledButton>
              </form>
              <br/>
              <form className={classes.root} noValidate autoComplete="off">
                <StyledButton onClick={props.approvePhase}>
                  Approve current phase
                </StyledButton>
              </form><br/>
                <StyledButton onClick={props.clientCancelProject}>
                  Cancel project
                </StyledButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} square={true} elevation={0}>
            <Box fontWeight="fontWeightBold" textAlign="left">    
              <Typography variant="h4" color="primary">
                  Service Provider Dashboard
              </Typography><br/>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField 
                  id="filled-basic" 
                  label="Phase name" 
                  variant="filled" 
                  fullWidth={true} 
                  type="text" 
                  name="phaseName" 
                  value={props.phaseName} 
                  onChange={props.handleChange}
                />
                <br/>
                <TextField 
                  id="filled-basic" 
                  label="Locked payment" 
                  variant="filled" 
                  type="number" 
                  name="lockedPayment" 
                  value={props.lockedPayment} 
                  onChange={props.handleChange}
                />
                <br/>
                <TextField 
                  id="filled-basic" 
                  label="Discretionary payment" 
                  variant="filled" 
                  type="number" 
                  name="discretionaryPayment" 
                  value={props.discretionaryPayment} 
                  onChange={props.handleChange}
                />
                <br/>
                <StyledButton onClick={props.definePhase}>
                  Create new phase
                </StyledButton>
              </form><br/>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField 
                  id="filled-basic" 
                  label="Amount to withdraw" 
                  variant="filled" 
                  type="number" 
                  name="serviceProviderWithdrawalAmount" 
                  value={props.serviceProviderWithdrawalAmount} 
                  onChange={props.handleChange}
                />
                <StyledButton 
                  onClick={props.serviceProviderWithdrawal}>
                  Withdraw
                </StyledButton>
              </form><br/>
              <form className={classes.root} noValidate autoComplete="off">
                <StyledButton onClick={props.startPhase}>
                  Start next phase
                </StyledButton>
              </form><br/>
              <StyledButton onClick={props.serviceProviderCancelProject}>
                Cancel project
              </StyledButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
