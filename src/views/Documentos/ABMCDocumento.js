import React, { useContext, useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { StyledButtonPrimary, StyledButtonSecondary } from '../../components/Buttons'
import { useHistory, useParams, Prompt } from 'react-router-dom';
import { Link, TextField, MenuItem, Divider, Box } from '@material-ui/core';
import { documentoService } from '../../services/documentoService';
import { Historial } from '../../components/Historial'
import { SnackbarComponent } from '../../components/Snackbar'
import { ModalComponent } from '../../components/Modal'
import { Chevron } from '../../assets/icons';
import { Documento } from '../../domain/documento';
import update from 'immutability-helper';
import useSnack from '../../hooks/UseSnack';
import { ButtonBox, FormBox, LeftInputBox, RightFormBox, RightInputBox, RootBoxABM, FullInputBox, CompleteInputBox } from '../../components/Contenedores';
import { UserContext } from '../../hooks/UserContext';
//Archivo
import { FileUploader } from '../../components/FileUploader'
import axios from 'axios';
import { REST_SERVER_URL } from "../../services/configuration";



const useStyles = makeStyles({
    link: {
        color: "#159D74",
        textAlign: "left",
        marginBottom: 20,
        cursor: "pointer",
    },
    linkModal: {
        color: "#159D74",
        textAlign: "left",
        marginLeft: 50,
        marginTop: 10,
        cursor: "pointer",
        fontWeight: 600
    },
    form: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 30,
    },
    inputs: {
        backgroundColor: "white",
        textAlign: "left"
    },
    span: {
        textAlign: "left",
        marginLeft: 10,
        marginBottom: 6
    },
    botones: {
        display: "flex",
        marginTop: 10,
    },
    divider: {
        marginTop: 40
    },
    inputsDisabled: {
        textAlign: "left",
        marginLeft: 10
    },
    spanDisabled: {
        textAlign: "left",
        marginLeft: 10,
        marginBottom: 6,
        color: "grey"
    },
    botonesDisabled: {
        background: "rgba(0, 0, 0 ,10%)",
    },
    chevron: {
        fontSize: "12px",
        marginRight: 8
    },
    delete: {
        textAlign: "left",
        color: "red",
        fontWeight: 600,
        fontSize: 14,
        marginTop: 4,
        cursor: "pointer"
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: "white",
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
        borderRadius: "6px",
        padding: "0 30px 32px 32px"
    },
});

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

export const ABMCDocumento = ({ edicion, creacion }) => {
    const classes = useStyles();
    const [documento, setDocumento] = useState('')
    const [campoEditado, setCampoEditado] = useState(false)
    const [cambiosGuardados, setCambiosGuardados] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack, snackColor } = useSnack();
    const [modalStyle] = useState(getModalStyle);
    const { user, setUser } = useContext(UserContext);
    const [selectedFile, setSelectedFile] = useState(null);

    let history = useHistory()
    const params = useParams()

    //Se llama cuando se actualiza un campo y pone el flag en true
    const actualizarValor = (event) => {
        const newState = update(documento, {
            [event.target.id]: { $set: event.target.value }
        })
        setDocumento(newState)
        setCampoEditado(true)
    }

    const backToDocumentos = () => {
        history.push("/documentos")
    }

    const popupModal = () => {
        setOpenModal(true)
    }

    // para cargar el telefono por id, o empezar con uno nuevo
    useEffect(() => {
        const fetchDocumento = async () => {
            try {
                let unDocumento
                if (creacion) {
                    unDocumento = new Documento()
                } else {
                    unDocumento = await documentoService.getByIdParaABM(params.id)
                }
                setDocumento(unDocumento)
            }
            catch (error) {
                usarSnack(error.response.data, true)
            }
        }

        fetchDocumento()
    }, [params.id, creacion])

    const crearDocumento = async () => {
        try {
            if (verificarCamposVacios()) {
                await onFileUpload()
                await documentoService.create(documento)
                setCampoEditado(false)
                history.push("/documentos", { openChildSnack: true, mensajeChild: "Nuevo documento creado correctamente." })
            } else {
                usarSnack("Campos obligatorios faltantes.", true)
            }
        } catch (error) {
            usarSnack(error.response.data, true)
        }
    }

    const modificarDocumento = async () => {
        try {
            if (verificarCamposVacios()) {
                await onFileUpload()
                await documentoService.update(documento)
                setCambiosGuardados(true)
                setCampoEditado(false)
                usarSnack("Documento modificado correctamente", false)
            } else {
                usarSnack("Campos obligatorios faltantes.", true)
            }
        } catch (error) {
            usarSnack(error.response.data, true)
        }
        setCambiosGuardados(false)
    }

    const eliminarDocumento = async () => {
        try {
            await documentoService.delete(documento.id)
            history.push("/documentos", { openChildSnack: true, mensajeChild: "Documento eliminado correctamente." })
        } catch (error) {
            usarSnack(error.response.data, true)
        }
    }

    const verificarCamposVacios = () => {
        return documento.titulo && documento.descripcion
    }

    const bodyModal = (

        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">¿Seguro desea eliminar este documento?</h2>
            <p id="simple-modal-description">Esta acción no se puede deshacer.</p>
            <Box display="flex" flexDirection="row" mt={4}>
                <StyledButtonPrimary onClick={eliminarDocumento}>Eliminar Documento</StyledButtonPrimary>
                <Link className={classes.linkModal} onClick={() => setOpenModal(false)}>
                    Cancelar
                </Link>
            </Box>
        </div>
    )

    //ARCHIVO
    const formatName = () => {
        let extension = selectedFile.name.split('.').pop();
        return `${documento.titulo}_${Date.now()}.${extension}`
    }

    const onFileUpload = async () => {
        try {
            if (selectedFile) {
                documento.enlaceDeDescarga = formatName()
                let formData = new FormData()

                formData.append('file', selectedFile, formatName());

                await axios.post('http://localhost:8080/uploadFile',
                    formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

            }
        } catch (error) {
            usarSnack(error.response.data, true)
        }
    }

    const onDownload = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/downloadFile/${documento.enlaceDeDescarga}`)
            let a = document.createElement('a');
            a.href = response.config.url;
            a.download = 'gastos';
            a.click();
        } catch (error) {
            usarSnack(error.response.data, true)
        }
    }

    const deleteFile = (event) => {
        documento.enlaceDeDescarga = null
        setSelectedFile(null)
        setCampoEditado(true)
    }

    const handleSelectFile = (file) => {
        setSelectedFile(file)
        setCampoEditado(true)
    }

    return (

        <RootBoxABM>
            <Prompt when={campoEditado} message={"Hay modificaciones sin guardar. ¿Desea salir de todas formas?"} />
            <FormBox>
                <Link className={classes.link} onClick={backToDocumentos}>
                    <Chevron className={classes.chevron} />
                    Volver a documentos
                </Link>
                {creacion &&
                    <Typography component="h2" variant="h5" className="tittle">
                        Nuevo Documento
                    </Typography>
                }

                {!creacion && edicion &&
                    <Typography component="h2" variant="h5" className="tittle">
                        Modificar Documento
                    </Typography>
                }

                <form className={classes.form} noValidate autoComplete="off">
                    <LeftInputBox clas>
                        <span className={classes.span}>Fecha</span>
                        <TextField disabled className={classes.inputs} id="fecha" value={documento.fechaCreacion || new Date(Date.now()).toLocaleDateString()} name="fecha" variant="outlined" />
                    </LeftInputBox>


                    <RightInputBox>
                        <span className={classes.span}>Autor</span>
                        <TextField disabled className={classes.inputs} id="autor" value={documento.autor || user.nombreYApellido()} name="autor" variant="outlined" />
                    </RightInputBox>

                    {user.esAdmin() &&
                        <LeftInputBox>
                            <span className={classes.span}>Título</span>
                            <TextField className={classes.inputs} id="titulo" value={documento.titulo || ''} onChange={(event) => actualizarValor(event)} name="titulo" variant="outlined" />
                        </LeftInputBox>
                    }

                    {!user.esAdmin() &&
                        <LeftInputBox>
                            <span className={classes.span}>Título</span>
                            <TextField disabled className={classes.inputs} id="titulo" value={documento.titulo} name="titulo" variant="outlined" />
                        </LeftInputBox>
                    }

                    {creacion && !edicion &&
                        <RightInputBox>
                            <span className={classes.span}>Archivo</span>
                            <FileUploader
                                onFileSelectSuccess={(file) => setSelectedFile(file)}
                                onFileSelectError={({ error }) => alert(error)}
                            />
                        </RightInputBox>
                    }

                    {!creacion && edicion &&

                        <RightInputBox>
                            <span className={classes.span}>Archivo</span>
                            {
                                documento.enlaceDeDescarga ?
                                    <Box display="flex" flexDirection="column">
                                        <StyledButtonPrimary className={classes.botones} onClick={onDownload} >Descargar documento</StyledButtonPrimary>
                                        {user.esAdmin() && <span className={classes.delete} onClick={deleteFile}>Eliminar archivo</span>}
                                    </Box>
                                    :
                                    <FileUploader
                                        onFileSelectSuccess={(file) => handleSelectFile(file)}
                                        onFileSelectError={({ error }) => alert(error)}
                                    />
                            }


                        </RightInputBox>
                    }

                    {user.esAdmin() &&
                        <CompleteInputBox>
                            <span className={classes.span}>Descripción</span>
                            <TextField multiline className={classes.inputs} id="descripcion" value={documento.descripcion || ''} onChange={(event) => actualizarValor(event)} name="descripcion" variant="outlined" />
                        </CompleteInputBox>
                    }


                    {!user.esAdmin() &&
                        <CompleteInputBox>
                            <span className={classes.span}>Descripción</span>
                            <TextField disabled multiline className={classes.inputs} id="descripcion" value={documento.descripcion} name="descripcion" variant="outlined" />
                        </CompleteInputBox>
                    }

                </form>

            </FormBox>

            <RightFormBox>
                {user.esAdmin() && creacion &&
                    <ButtonBox>
                        <StyledButtonPrimary className={classes.botones} onClick={() => crearDocumento()} >Crear Documento</StyledButtonPrimary>
                        <StyledButtonSecondary className={classes.botones} onClick={backToDocumentos}>Cancelar</StyledButtonSecondary>
                    </ButtonBox>
                }
                {user.esAdmin() && edicion && !creacion &&
                    <ButtonBox>
                        {campoEditado &&
                            <StyledButtonPrimary className={classes.botones} onClick={modificarDocumento}>Guardar cambios</StyledButtonPrimary>
                        }
                        {!campoEditado &&
                            <StyledButtonPrimary className={classes.botonesDisabled} disabled>Guardar cambios</StyledButtonPrimary>
                        }
                        <StyledButtonSecondary className={classes.botones} onClick={popupModal}>Eliminar documento</StyledButtonSecondary>
                    </ButtonBox>
                }
                <Divider className={classes.divider} />

                {edicion && !creacion &&
                    <Historial tipo="DOCUMENTO" id={params.id} update={cambiosGuardados} />
                }

            </RightFormBox>

            <SnackbarComponent snackColor={snackColor} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)} />

            <ModalComponent openModal={openModal} bodyModal={bodyModal} handleCloseModal={() => setOpenModal(false)} />

        </RootBoxABM>

    )
}


