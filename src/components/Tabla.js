import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton, TableFooter, TablePagination } from '@material-ui/core';
import PropTypes from 'prop-types';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import Pagination from '@material-ui/lab/Pagination';

const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));
  
  function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }

  // PAGINADOR CHICO ----------------------------------------------------------------

  const useStyles2 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
  
  export default function PaginationRounded({datos}) {
    const classes = useStyles2();
  
    return (
      <div className={classes.root}>
        <Pagination count={datos} shape="rounded" />
        {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
      </div>
    );
  }

  // ---------------------------------------------------------------------------------

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#F5F5F5F5",
    color: "black",
  },
  body: {
    fontSize: 14,
  },
  root: {
    padding: 30
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
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    borderSpacing: "0 1em",
    borderCollapse: "separate"
  },
  container:{
    marginTop: 30,
    boxShadow: "none",
    backgroundColor: "#F5F5F5",
  },
  head:{
      border:"none",
      padding: "0 0 0 30px"
  }
});


TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

export const Tabla = ({datos,headers,ColumnasCustom}) =>{
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, datos.length - page * rowsPerPage);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
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
          {(rowsPerPage > 0
            ? datos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : datos)
            .map((dato) => (
                    // <StyledTableRow key={dato.id}>
                    //     <StyledTableCell component="th" scope="row">{dato.nombre +" "+ dato.apellido}</StyledTableCell>
                    //     <StyledTableCell component="th" scope="row">{dato.correo}</StyledTableCell>
                    //     <StyledTableCell component="th" scope="row">{dato.dni}</StyledTableCell>
                    //     <StyledTableCell component="th" scope="row">Modificado hace {Math.floor(Math.random() * 10)} horas</StyledTableCell>
                    //     <StyledTableCell component="th" scope="row">Propietario</StyledTableCell>
                    // </StyledTableRow>
                    ColumnasCustom(dato)
              )
            )}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            {/* <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={datos.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            /> */}
            <PaginationRounded datos={datos.length}/>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    )
}