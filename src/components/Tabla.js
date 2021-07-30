import React, { useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableFooter, TableSortLabel } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useMediaQuery } from './../hooks/UseMediaQuery';


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
    border: "none",
    [theme.breakpoints.down("sm")]: {
      padding: "30px 5px",
    }
  }
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: "white",
    borderRadius: 2,
    padding: 22,
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)"
  },
}))(TableRow);


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
    border: "none",
    borderSpacing: "0 1em",
    borderCollapse: "separate",
    [theme.breakpoints.down("sm")]: {
      minWidth: 300
    }
  },
  container:{
    marginTop: 30,
    boxShadow: "none",
    backgroundColor: "#F5F5F5",
  },
  head:{
      borderBottom:"none",
      padding: "0 0 0 30px",
      color: "rgba(0, 0, 0, 0.45)",
      fontFamily:"ProximaNovaBold",
      [theme.breakpoints.down("sm")]: {
        fontSize: 12,
        padding:"0px 5px"
      }
  },
  paginator:{
    display:"flex",
    justifyContent:"flex-end"
  }
}));

const descendingComparator = (a, b, orderBy) =>{
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


export const Tabla = ({datos,headers,ColumnasCustom, heightEnd, defaultSort, defaultOrder}) =>{
    const classes = useStyles()
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState(defaultOrder)
    const [orderBy, setOrderBy] = useState(defaultSort)
    const pageSize = 5
    const totalItems = datos.length
    let mobileSize = useMediaQuery('(max-width: 400px)')
    let tabletSize = useMediaQuery('(max-width: 768px)')
    let webSize = useMediaQuery('(min-width: 769px)')

    let totalPages = Math.ceil(totalItems / pageSize);
    let endIndex =  pageSize - (totalItems - pageSize * (page -1))

    const handleChange = (event, value) => {
      setPage(value);
    };

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property); 
      ordenarDatos()
    };

    const ordenarDatos = () =>{
      return stableSort(datos, getComparator(order, orderBy))
    }

    const typeOrder = () =>{
      if(page===1){
        return ordenarDatos().slice( 0, pageSize) 
      }else{
        return ordenarDatos().slice( (page-1)  * pageSize, (page-1) * pageSize + pageSize)
      } 
    }

    return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
           <TableHead className={classes.head}>
              <TableRow>
                {headers.map((header) => (
                  <StyledTableCell
                    key={header.id}
                    className={classes.head}
                    sortDirection={orderBy === header.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === header.id}
                      direction={orderBy === header.id ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, header.id)}
                      
                    >
                      {header.label}
                    </TableSortLabel>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
        <TableBody>
          { (pageSize > 0
            ? typeOrder()
            : (ordenarDatos()))
            .map((dato) => (
                    ColumnasCustom(dato, mobileSize, tabletSize, webSize)
              )
            )}

          {page === totalPages && endIndex !== 0 && (
            <TableRow style={{ height: heightEnd * (endIndex)}}>
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