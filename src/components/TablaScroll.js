import React, { useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableFooter } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';


export const StyledTableCellScroll = withStyles((theme) => ({
  head: {
    backgroundColor: "#F5F5F5F5",
    color: "black",
  },
  body: {
    fontSize: 14,
  },
  root: {
    padding: 30,
    border: "none"
  }
}))(TableCell);

export const StyledTableRowScroll = withStyles((theme) => ({
  root: {
    backgroundColor: "white",
    borderRadius: 2,
    boxShadow: "0px 1px 2px black"
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
    borderCollapse: "collapse",
  },
  container:{
    marginTop: 30,
    boxShadow: "none",
    backgroundColor: "#F5F5F5",
  },
  head:{
      borderBottom:"none",
      padding: "0 0 0 30px",
      color: "rgba(0, 0, 0, 0.45)"
  },
  paginator:{
    display:"flex",
    justifyContent:"flex-end"
  }
});



export const TablaScroll = ({datos,headers,ColumnasCustom, heightEnd}) =>{
    const classes = useStyles();

    return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead className={classes.head}>
          <TableRow>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.map((dato) => (
                    ColumnasCustom(dato)
              )
            )}

        </TableBody>
        <TableFooter>
             
        </TableFooter>
      </Table>
      
    </TableContainer>
    )
}