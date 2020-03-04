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
    <div className={classes.root}  >
        <Box paddingBottom={0} marginBottom={0}>
        <Typography variant="h4" color="primary" textAlign="center"  >
            <br/>Project Overview
        </Typography>
        </Box>
      <Grid container spacing={0} margin="0px">

        <Grid item xs={6} margin="0px" padding="0px" >
          <Paper className={classes.paper} square="true" elevation="0">
          <Box textAlign="right" paddingTop={0} marginTop={0} >    
              <Typography variant="body2" color="textPrimary">
                  <strong>
                    Client address:<br/>
                    Client balance:<br/>
                    Service provider address:<br/>
                    Service provider balance:<br/>
                    Escrow balance:<br/>
                    Phase exists:<br/>
                    Phase structure approved:<br/>
                    Project cancelled:
                  </strong> 
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} square="true" elevation="0">
          <Box textAlign="left" padding="0px">    
          <Typography variant="body2" padding="0px" color="textPrimary" >
              {props.project.client}<br/>
              {props.project.clientBalance}<br/>
              {props.serviceProvider}<br/>
              {props.project.serviceProviderBalance}<br/>
              {props.project.escrowBalance}<br/>
              {String(props.project.phaseExists)}<br/>
              {String(props.project.clientApprovedPhaseStructure)}<br/>
              {String(props.project.projectCancelled)}
              </Typography>
            </Box>
            </Paper>
        </Grid>
      </Grid>
   </div>
  );
}
