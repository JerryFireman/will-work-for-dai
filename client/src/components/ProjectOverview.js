import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

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

export default function ProjectOverview(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0} margin="0px">
        <Grid item xs={5}>
          <Paper className={classes.paper} variant="outlined">
          <Box fontWeight="fontWeightBold" textAlign="right">    
              <Typography variant="h6" color="black" padding="0px">
                  Client address:<br/>
                  Client balance:<br/>
                  Service provider address:<br/>
                  Service provider balance:<br/>
                  Escrow balance:<br/>
                  Phase exists:<br/>
                  Phase structure approved:<br/>
                  Project cancelled:
                  
              </Typography><br/>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper className={classes.paper}>
          <Box fontWeight="fontWeightBold" textAlign="left" padding="0px">    
          <Typography variant="h6" color="black" padding="0px">
              {props.project.client}<br/>
              {props.project.clientBalance}<br/>
              {props.project.client}<br/>
              {props.project.serviceProviderBalance}<br/>
              {props.project.escrowBalance}<br/>
              {String(props.project.phaseExists)}<br/>
              {String(props.project.clientApprovedPhaseStructure)}<br/>
              {String(props.project.projectCancelled)}
              </Typography><br/>
            </Box>
            </Paper>
        </Grid>
      </Grid>
   </div>
  );
}
