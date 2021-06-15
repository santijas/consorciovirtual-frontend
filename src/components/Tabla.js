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


export const StyledTableCell = withStyles((theme) => ({
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

export const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    padding: 22,
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)"
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
    border: "none",
    borderSpacing: "0 1em",
    borderCollapse: "separate"
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



export const Tabla = ({datos,headers,ColumnasCustom}) =>{
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const pageSize = 5
    const totalItems = datos.length
    
    let totalPages = Math.ceil(totalItems / pageSize);
    let endIndex =  pageSize - (totalItems - pageSize * (page -1))

    const handleChange = (event, value) => {
      setPage(value);
    };

    return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead className={classes.head}>
          <TableRow>
          {headers.map((header) => (
            <StyledTableCell className={classes.head}>{header}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(pageSize > 0
            ? (page===1? datos.slice( 0, pageSize) : datos.slice( (page-1)  * pageSize, (page-1) * pageSize + pageSize))
            : datos)
            .map((dato) => (
                    ColumnasCustom(dato)
              )
            )}

          {page === totalPages && endIndex !== 0 && (
            <TableRow style={{ height: 112.7 * (endIndex)}}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
             
        </TableFooter>
      </Table>
      <Pagination className={classes.paginator} count={totalPages} page={page} defaultPage={1} onChange={handleChange}/>
    </TableContainer>
    )
}