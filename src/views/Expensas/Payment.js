import React, { useContext, useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { expensaService } from '../../services/expensaService';
import { useHistory, useLocation, useParams, withRouter } from 'react-router-dom';
import { SnackbarComponent } from '../../components/Snackbar';
import ReactLoading from 'react-loading';
import useSnack from '../../hooks/UseSnack';
import { RootBox } from '../../components/Contenedores';
import { Box } from '@material-ui/core';
import { Error, Success } from '../../assets/icons';
import { StyledButtonPrimary } from '../../components/Buttons';
import { UserContext } from '../../hooks/UserContext';


const useStyles = makeStyles ({
    contenedorLoading:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        background:"white",
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
        borderRadius: "2px",
        width: "fit-content",
        padding: 60,
        position: "absolute",
        left: "50%",
        top: "45%",
        transform: "translate(-50%,-50%)"
    },
    spin:{
        marginBottom: 40
    },
    tittle:{
        fontWeight: 500,
        fontSize: 24,
        fontStyle: "normal",
    },
    span:{
        color: "rgba(0, 0, 0, 0.55)",
        fontSize:24
    },
    spanColor:{
        color: "#159D74",
        fontSize:24
    },
    icon:{
        fontSize: 60,
        marginBottom: 30
    },
    button:{
        marginTop: 30
    }
  });


export const Payment = () =>{
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const { user } = useContext(UserContext);
    let history = useHistory()
    const params = useParams()


    useEffect( ()  =>  {
        const pagarExpensa = async () =>{
            try{
                await expensaService.pagarExpensa(params.id)
                setIsLoading(false)
            }catch(e){
                setIsLoading(false)
                setError(e.message)
            }
        }
        pagarExpensa()
    },[params.id])

    const redirectExpensas = () =>{
        history.push("/expensas")
    }


    return (
        <RootBox>
           {isLoading
           ?<Box className={classes.contenedorLoading}>
                <ReactLoading type="spin" color="#159D74" height={80} width={80} className={classes.spin} />
               <Typography component="h3" variant="h5" className={classes.tittle}>
                Generando comprobante de pago
                </Typography>
                <span className={classes.span}>Expensa #{params.id}</span>
           </Box>
            :
            <div>
                {error && 
                    <Box className={classes.contenedorLoading}>
                                <Error className={classes.icon}/>
                                <Typography component="h3" variant="h5" className={classes.tittle}>
                                 ¡Ha habido un error!
                                </Typography>
                                <div>
                                    <span className={classes.span}>No se ha podido generar el comprobante.</span>
                                </div>
                                <StyledButtonPrimary className={classes.button} onClick={ redirectExpensas }>Volver a expensas</StyledButtonPrimary>
                    </Box>
                }
                {!error &&
                <Box className={classes.contenedorLoading}>
                    <Success className={classes.icon}/>
                    <Typography component="h3" variant="h5" className={classes.tittle}>
                     ¡Listo!
                    </Typography>
                    <div>
                        <span className={classes.span}>Se envió el comprobante de pago a </span>
                        <span className={classes.spanColor}>{user?.correo}</span>
                    </div>
                    <StyledButtonPrimary className={classes.button} onClick={ redirectExpensas }>Volver a expensas</StyledButtonPrimary>
                </Box>
                }
            </div>
            }
            
         </RootBox>

        
    )
}
export default withRouter(Payment)