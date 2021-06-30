import {useRef, useState} from 'react'
import { StyledButtonPrimary } from './Buttons'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles ({
    botones:{
        display: "flex",
        alignItems:"center"
    },
    nombreArchivo:{
        marginLeft: 10,
    },
    boton:{
        color: "#159D74",
        backgroundColor: "rgba(21, 157, 116, 15%)"
    }
  });

export const FileUploader = ({onFileSelectSuccess}) => {
    const classes = useStyles();
    const fileInput = useRef(null)
    const [nombreArchivo, setNombreArchivo] = useState("Adjuntar archivo")

    const handleFileInput = (e) => {
        const file = e.target.files[0]
        
        if(file){ 
        onFileSelectSuccess(file)
        setNombreArchivo(file.name)
        } else{
            onFileSelectSuccess(null)
            setNombreArchivo("Adjuntar archivo")
        }
    }
    

    return (
        <div className="file-uploader">
            <input 
                type="file" 
                onChange={handleFileInput}
                style={{display: "none"}}
                id="button-file"
                />
            <label htmlFor="button-file" className={classes.botones}>
                <StyledButtonPrimary
                    className={classes.boton}
                    component="span"
                    onClick={e => fileInput.current && fileInput.current.click()}
                    >{nombreArchivo}
                </StyledButtonPrimary>
            </label>
        </div>
    )
}
