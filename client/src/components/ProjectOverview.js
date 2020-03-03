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

export default function ProjectOverview(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} margin="50px">
        <Grid item xs={3}>
          <Paper className={classes.paper} variant="outlined">
          <Box fontWeight="fontWeightBold" textAlign="right">    
              <Typography variant="h6" color="primary" >
                  Client Address
              </Typography><br/>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
          <Box fontWeight="fontWeightBold" textAlign="left">    
              <Typography variant="h4" color="primary">
                  Service Provider Dashboard
              </Typography><br/>
            </Box>
            </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
