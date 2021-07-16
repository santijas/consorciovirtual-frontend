import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { expensaService } from '../../services/expensaService';
import { useHistory, useLocation, useParams, withRouter } from 'react-router-dom';
import { SnackbarComponent } from '../../components/Snackbar';
import ReactLoading from 'react-loading';
import useSnack from '../../hooks/UseSnack';
import { RootBox } from '../../components/Contenedores';


const useStyles = makeStyles ({
    loading:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        heigth: "100%"
    },
    spin:{
        marginTop: 100
    }
  });


export const Payment = () =>{
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
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


    return (
        <RootBox>
           {isLoading
           ?<div className={classes.loading}>
               <Typography component="h2" variant="h5" className="tittle">
                Generando comprobante de pago de expensa N#{params.id}
                </Typography>
                <ReactLoading type="spin" color="#159D74" height={150} width={150} className={classes.spin} />
           </div>
            :
            <div>
                {error && 
                <div> {error}
                </div>}
                {!error &&
                <div>Se ha enviado el comprobante de pago de la expensa a su correo electrónico.

                </div>
                }
            </div>
            }
            
         </RootBox>

        
    )
}
export default withRouter(Payment)