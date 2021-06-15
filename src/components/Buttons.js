import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';


export const StyledButtonPrimary = withStyles((theme) => ({
  root:{
    color: "white",
    background: "#159D74",
    padding: "10px 24px",
    borderRadius: 2,
    textTransform: "none"
}
  }))(Button);


export const StyledButtonSecondary = withStyles((theme) => ({
    root:{
      color: "#BB0E0E",
      background: "rgba(187, 14 ,14 ,15%)",
      padding: "10px 24px",
      borderRadius: 2,
      textTransform: "none"
  }
    }))(Button);
  
  