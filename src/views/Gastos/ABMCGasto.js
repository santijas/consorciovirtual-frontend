import React, { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, InputAdornment, makeStyles, Select, Typography } from '@material-ui/core';
import { StyledButtonPrimary, StyledButtonSecondary } from '../../components/Buttons'
import { useHistory, useParams, Prompt } from 'react-router-dom';
import { Link, TextField, MenuItem, Divider, Box } from '@material-ui/core';
import { Historial } from '../../components/Historial'
import { SnackbarComponent } from '../../components/Snackbar'
import { ModalComponent } from '../../components/Modal'
import { Chevron } from '../../assets/icons';
import update from 'immutability-helper';
import { Gasto } from '../../domain/gasto';
import { Factura } from '../../domain/factura';
import { Documento } from '../../domain/documento';
import { gastoService } from '../../services/gastoService';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import 'moment/locale/es'
import moment from 'moment';
import { FileUploader } from '../../components/FileUploader'
import useSnack from '../../hooks/UseSnack';
import { ButtonBox, FormBox, LeftInputBox, RightFormBox, RightInputBox, RootBoxABM } from '../../components/Contenedores';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import { fechaMaxNow, fechaMinGasto, fechaMinMenosTresAños, handleOnlyNumbers, handleOnlyNumbersDot } from '../../utils/formats';

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
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: "white",
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
        borderRadius: "6px",
        padding: "0 30px 32px 32px"
    },
    inputsDate: {
        textTransform: "capitalize",
        cursor: "pointer"
    },
    delete: {
        textAlign: "left",
        color: "red",
        fontWeight: 600,
        fontSize: 14,
        marginTop: 4,
        cursor: "pointer"
    },
    acordeon: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        borderRadius: "6px",
        boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
    },
    heading: {
        fontWeight: 600,

    },
    resetStyle: {
        transition: "none"
    },
    bodyAcordeon: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    select: {
        "&:focus": {
            backgroundColor: "white"
        }
    },
    helper: {
        backgroundColor: "white"
    }

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

const tipoDeGasto = [
    {
        value: 'Común',
        label: 'Común',
    },
    {
        value: 'Extraordinaria',
        label: 'Extraordinaria',
    }
]

const rubros = [
    {
        value: 'SUELDOYCARGASSOCIALES',
        label: 'Sueldo y cargas sociales',
    },
    {
        value: 'MANTENIMIENTOPARTESCOMUNES',
        label: 'Mantenimiento de partes comúnes',
    },
    {
        value: 'SERVICIOSPUBICOS',
        label: 'Servicios públicos',
    },
    {
        value: 'OTROSSERVICIOS',
        label: 'Otros servicios',
    },
    {
        value: 'REPARACIONESENUNIDADES',
        label: 'Reparacion en unidades',
    },
    {
        value: 'GASTOSBANCARIOS',
        label: 'Gastos bancarios',
    },
    {
        value: 'LIMPIEZA',
        label: 'Limpieza',
    },
    {
        value: 'ADMINISTRACION',
        label: 'Administración',
    },
    {
        value: 'SEGUROS',
        label: 'Seguros',
    },
    {
        value: 'OTROS',
        label: 'Otros',
    }

]

export const ABMCGasto = ({ edicion, creacion }) => {
    const classes = useStyles();
    const [gasto, setGasto] = useState('')
    const [factura, setFactura] = useState(new Factura())
    const [campoEditado, setCampoEditado] = useState(false)
    const [cambiosGuardados, setCambiosGuardados] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack, snackColor } = useSnack();
    const [modalStyle] = useState(getModalStyle);
    const [selectedDate, handleDateChange] = useState(new Date());
    const [selectedFile, setSelectedFile] = useState(null);
    const [checkFactura, setCheckFactura] = useState(false)
    const [errors, setErrors] = useState({})

    let history = useHistory()
    const params = useParams()
    //Se usa para modificaciones solamente
    let idComprobanteAmodificar;
    let tipoComprobanteAmodificar;

    const fetchData = async () => {
        try {
            let unGasto
            let unaFactura
            if (creacion) {
                unGasto = new Gasto()
                unaFactura = new Factura()
            } else {
                let respuesta = await gastoService.getById(params.id)
                unGasto = respuesta[0]
                idComprobanteAmodificar = respuesta[1]
                tipoComprobanteAmodificar = respuesta[2]
                if (tipoComprobanteAmodificar === "factura") {
                    unaFactura = await gastoService.getFacturaById(idComprobanteAmodificar)
                } else {
                    unaFactura = new Factura()
                }
            }
            setGasto(unGasto)
            setFactura(unaFactura)
        }
        catch (error) {
            usarSnack(error.response.data, true)
        }
    }

    const actualizarValor = (event) => {
        const newState = update(gasto, {
            [event.target.id]: { $set: event.target.value }
        })
        setGasto(newState)
        setCampoEditado(true)
    }

    const actualizarValorFactura = (event) => {
        const newState = update(factura, {
            [event.target.id]: { $set: event.target.value }
        })
        setFactura(newState)
        setCampoEditado(true)
    }

    const backToGastos = () => {
        history.push("/gastos")
    }

    const popupModal = () => {
        setOpenModal(true)
    }

    const formatName = () => {
        let extension = selectedFile.name.split('.').pop();
        return `Gasto_${gasto.titulo}_${gasto.periodo}_${gasto.rubro}_${Date.now()}.${extension}`
    }


    const onFileUpload = async () => {
        try {
            if (selectedFile) {
                gasto.url = formatName()
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
            const response = await axios.get(`http://localhost:8080/downloadFile/${gasto.url}`)
            let a = document.createElement('a');
            a.href = response.config.url;
            a.download = 'gastos';
            a.click();
        } catch (error) {
            usarSnack(error.response.data, true)
        }
    }


    useEffect(() => {
        fetchData()
    }, [])

    const createData = async () => {
        try {
            gasto.periodo = moment(new Date(Date.now())).format('YYYY-MM')
            if (validarGasto()) {
                await onFileUpload()
                await tieneFactura()
                setCampoEditado(false)
                history.push("/gastos", { openChildSnack: true, mensajeChild: "Gasto creado correctamente." })
            } else {
                selectedFile
                ? usarSnack("Campos obligatorios faltantes.", true)
                : usarSnack("Debe adjuntar un archivo al gasto.", true)
            }
        } catch (error) {
            usarSnack(error.response.data, true)
        }
    }

    const tieneFactura = async () => {
        await gastoService.create(gasto)
        try {
            if (checkFactura === true) {
                factura.enlaceDeDescarga = gasto.url
                console.log(factura)
                await gastoService.createComprobante(factura)
            } else {
                let documento = new Documento()
                documento.enlaceDeDescarga = gasto.url
                documento.type = "documento"
                await gastoService.createComprobante(documento)
            }
        } catch (error) {
            //Si falla la creación del documento se elimina el gasto para quedar consistente
            usarSnack(error.response.data, true)
            await gastoService.eliminarPosta(gasto.url)
        }
    }

    const updateData = async () => {
        try {
            if (validarGasto()) {
                await onFileUpload()
                await gastoService.update(gasto)
                if(gasto.tipoComprobante === "factura"){
                    await gastoService.updateFactura(factura, gasto.idComprobante)
                }
                setCambiosGuardados(true)
                setCampoEditado(false)
                usarSnack("Gasto modificado correctamente", false)
            } else {
                selectedFile
                ? usarSnack("Campos obligatorios faltantes.", true)
                : usarSnack("Debe adjuntar un archivo al gasto.", true)
            }
        } catch (error) {
            usarSnack(error.response.data, true)
        }
        setCambiosGuardados(false)
    }

    const deleteData = async () => {
        try {
            await gastoService.delete(gasto.id)
            history.push("/gastos", { openChildSnack: true, mensajeChild: "Gasto eliminado correctamente." })
        } catch (error) {
            usarSnack(error.response.data, true)
        }
    }

    const validarGasto = () => {
        setErrors(null)
        if (!gasto.titulo) {
            setErrors(prev => ({ ...prev, titulo: "Campo obligatorio" }))
        }

        if (!gasto.periodo) {
            setErrors(prev => ({ ...prev, periodo: "Campo obligatorio" }))
        }

        if (!gasto.tipo) {
            setErrors(prev => ({ ...prev, tipo: "Campo obligatorio" }))
        }

        if (!gasto.rubro) {
            setErrors(prev => ({ ...prev, rubro: "Campo obligatorio" }))
        }

        if (!gasto.importe) {
            setErrors(prev => ({ ...prev, importe: "Campo obligatorio" }))
        }

        if (!selectedFile) {
            setErrors(prev => ({ ...prev, selectedFile: "Campo obligatorio" }))
        }
        if(checkFactura){
            return gasto.titulo && gasto.periodo && gasto.rubro && gasto.tipo && gasto.importe && (selectedFile || gasto.url) && validarFactura()
        }
        return gasto.titulo && gasto.periodo && gasto.rubro && gasto.tipo && gasto.importe && (selectedFile || gasto.url)
    }

    const validarFactura = () =>{
            if (!factura.fechaFactura) {
                setErrors(prev => ({ ...prev, fechaFactura: "Campo obligatorio" }))
            }
    
            if (!factura.tipoFactura) {
                setErrors(prev => ({ ...prev, tipoFactura: "Campo obligatorio" }))
            }

            if (!factura.puntoDeVenta) {
                setErrors(prev => ({ ...prev, puntoDeVenta: "Campo obligatorio" }))
            }

            if (!factura.numeroFactura) {
                setErrors(prev => ({ ...prev, numeroFactura: "Campo obligatorio" }))
            }

            if (!factura.cuitProveedor) {
                setErrors(prev => ({ ...prev, cuitProveedor: "Campo obligatorio" }))
            }
            if (!factura.cuitReceptor) {
                setErrors(prev => ({ ...prev, cuitReceptor: "Campo obligatorio" }))
            }
            if (!factura.cae) {
                setErrors(prev => ({ ...prev, cae: "Campo obligatorio" }))
            }

            if (!factura.importe) {
                setErrors(prev => ({ ...prev, importeFactura: "Campo obligatorio" }))
            }

            if (factura.cae && !validarCae()) {
                setErrors(prev => ({ ...prev, cae: "El CAE debe tener 14 digitos." }))
            }

            
            if (factura.cuitProveedor && !validarCuitProveedor()) {
                setErrors(prev => ({ ...prev, cuitProveedor: "El Cuit debe tener 11 digitos." }))
            }

            if (factura.cuitReceptor && !validarCuitReceptor()) {
                setErrors(prev => ({ ...prev, cuitReceptor: "El Cuit debe tener 11 digitos." }))
            }

            return factura.fechaFactura && factura.puntoDeVenta && factura.tipoFactura && factura.numeroFactura && factura.cuitProveedor 
            && factura.cuitReceptor && factura.cae && factura.importe && validarCae() && validarCuitReceptor() && validarCuitProveedor()

    }
    

    const validarCae = () =>{
        return factura.cae.length === 14
    }

    const validarCuitReceptor = () =>{
        return factura.cuitReceptor.length === 11
    }

    
    const validarCuitProveedor = () =>{
        return factura.cuitProveedor.length === 11
    }

    const handleChangeType = (event) => {
        const newState = update(gasto, {
            tipo: { $set: event.target.value }
        })
        setGasto(newState)
        setCampoEditado(true)
    };

    const handleChangeRubro = (event) => {
        const newState = update(gasto, {
            rubro: { $set: event.target.value }
        })
        setGasto(newState)
        setCampoEditado(true)
    };

    const handleSelectFile = (file) => {
        setSelectedFile(file)
        setCampoEditado(true)
    };

    const deleteFile = (event) => {
        gasto.url = null
        setSelectedFile(null)
        setCampoEditado(true)
    };

    const handleFactura = () => {
        if (checkFactura === true) {
            setCheckFactura(false)
            if (creacion) {
                setFactura(new Factura())
            }
        } else {
            setCheckFactura(true)
        }
    }



    const bodyModal = (

        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">¿Estás seguro que querés eliminar este gasto?</h2>
            <p id="simple-modal-description">Esta acción no se puede deshacer.</p>
            <Box display="flex" flexDirection="row" mt={4}>
                <StyledButtonPrimary onClick={deleteData}>Eliminar gasto</StyledButtonPrimary>
                <Link className={classes.linkModal} onClick={() => setOpenModal(false)}>
                    Cancelar
                </Link>
            </Box>
        </div>
    )

    const renderInput = (props) => (
        <TextField
            className={classes.inputsDate}
            id="tipo"
            onClick={props.onClick}
            onChange={props.onChange}
            value={props.value}
            variant="outlined"
            inputProps={{ className: classes.inputsDate }}
        />

    );

    return (

        <RootBoxABM>
            <Prompt when={campoEditado} message={"Hay modificaciones sin guardar. ¿Desea salir de todas formas?"} />
            <FormBox>
                <Link className={classes.link} onClick={backToGastos}>
                    <Chevron className={classes.chevron} />
                    Volver a gastos
                </Link>
                {creacion &&
                    <Typography component="h2" variant="h5" className="tittle">
                        Nuevo gasto
                    </Typography>
                }

                {!creacion && edicion &&
                    <Typography component="h2" variant="h5" className="tittle">
                        Modificar gasto
                    </Typography>
                }

                <form className={classes.form} noValidate autoComplete="off">

                    {creacion &&
                        <LeftInputBox>
                            <span className={classes.span}>Período</span>
                            <MuiPickersUtilsProvider utils={MomentUtils} locale={moment().locale('es')} >
                                <DatePicker
                                    views={["year", "month"]}
                                    value={selectedDate}
                                    minDate={new Date(Date.now())}
                                    inputVariant="outlined"
                                    onChange={handleDateChange}
                                    TextFieldComponent={renderInput}
                                />
                            </MuiPickersUtilsProvider>
                        </LeftInputBox>
                    }

                    {!creacion && edicion &&
                        <LeftInputBox>
                            <span className={classes.span}>Período</span>
                            <MuiPickersUtilsProvider utils={MomentUtils} locale={moment().locale('es')}>
                                <DatePicker
                                    className={classes.inputsDate}
                                    views={["year", "month"]}
                                    value={gasto.periodo}
                                    disabled
                                    inputVariant="outlined"
                                    onChange={(event) => actualizarValor(event)}
                                />
                            </MuiPickersUtilsProvider>
                        </LeftInputBox>
                    }

                    <RightInputBox>
                        <span className={classes.span} >Titulo</span>
                        <TextField
                            className={classes.inputs}
                            id="titulo"
                            value={gasto.titulo || ''}
                            onChange={(event) => actualizarValor(event)}
                            name="titulo"
                            variant="outlined"
                            error={Boolean(errors?.titulo)}
                            helperText={errors?.titulo}
                            inputProps={{ maxLength: 30 }}
                        />
                    </RightInputBox>

                    {!creacion && edicion &&
                        <LeftInputBox>
                            <span className={classes.span}>Tipo</span>
                            <TextField
                                className={classes.inputs}
                                id="tipo" value={gasto.tipo || ''}
                                onChange={(event) => actualizarValor(event)}
                                name="tipo"
                                variant="outlined"
                                disabled
                            />
                        </LeftInputBox>
                    }

                    {creacion && !edicion &&
                        <LeftInputBox>
                            <span className={classes.span}>Tipo</span>
                            <Select
                                className={classes.inputs}
                                id="tipo"
                                select
                                onChange={handleChangeType}
                                value={gasto.tipo || ''}
                                variant="outlined"
                                error={Boolean(errors?.tipo)}
                                helperText={errors?.tipo}
                                inputProps={{ classes: { select: classes.select } }}
                            >
                                {tipoDeGasto.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </LeftInputBox>
                    }

                    <RightInputBox>
                        <span className={classes.span}>Monto</span>
                        <TextField
                            className={classes.inputs}
                            id="importe"
                            value={gasto.importe || ''} 
                            onChange={(event) => actualizarValor(event)} 
                            name="importe" 
                            variant="outlined" 
                            type="text" 
                            error={Boolean(errors?.importe)}
                            helperText={errors?.importe}
                            inputProps={{ maxLength: 15 }}
                            onInput={ handleOnlyNumbersDot }
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            />
                    </RightInputBox>

                    <LeftInputBox>
                        <span className={classes.span}>Rubro</span>
                        <Select
                            className={classes.inputs}
                            id="rubro"
                            select
                            onChange={handleChangeRubro}
                            value={gasto.rubro || ''}
                            variant="outlined"
                            inputProps={{ classes: { select: classes.select } }}
                            error={Boolean(errors?.rubro)}
                            helperText={errors?.rubro}
                        >
                            {rubros.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </LeftInputBox>

                    {creacion && !edicion &&
                        <RightInputBox>
                            <span className={classes.span}>Archivo</span>
                            <FileUploader
                                error={Boolean(errors?.selectedFile)}
                                helperText={errors?.selectedFile}
                                onFileSelectSuccess={(file) => setSelectedFile(file)}
                                onFileSelectError={({ error }) => alert(error)}
                            />
                        </RightInputBox>
                    }

                    {!creacion && edicion &&

                        <RightInputBox>
                            <span className={classes.span}>Archivo</span>
                            {
                                gasto.url ?
                                    <Box display="flex" flexDirection="column">
                                        <StyledButtonPrimary className={classes.botones} onClick={onDownload} >Descargar documento</StyledButtonPrimary>
                                        <span className={classes.delete} onClick={deleteFile}>Eliminar archivo</span>
                                    </Box>
                                    :
                                    <FileUploader
                                        onFileSelectSuccess={(file) => handleSelectFile(file)}
                                        onFileSelectError={({ error }) => alert(error)}
                                    />
                            }


                        </RightInputBox>
                    }

                    {factura &&
                        <Accordion id="acordeon" className={classes.acordeon} onChange={handleFactura}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className={classes.resetStyle}

                            >
                                <Typography className={classes.heading}>{"Datos de facturación"}</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.bodyAcordeon}>

                                <LeftInputBox>
                                    <span className={classes.span}>Tipo de Factura</span>
                                    <TextField 
                                    className={classes.inputs} 
                                    id="tipoFactura" 
                                    value={factura.tipoFactura || ''} 
                                    onChange={(event) => actualizarValorFactura(event)} 
                                    name="tipofactura" 
                                    variant="outlined" 
                                    error={Boolean(errors?.tipoFactura)}
                                    helperText={errors?.tipoFactura}
                                    inputProps={{ maxLength: 1 }}
                                    FormHelperTextProps={{ style: {backgroundColor: "white"} }}
                                    />
                                </LeftInputBox>

                                <RightInputBox>
                                    <span className={classes.span}>Fecha de facturación</span>
                                    <TextField 
                                    className={classes.inputs} 
                                    id="fechaFactura" 
                                    value={factura.fechaFactura || ''} 
                                    onChange={(event) => actualizarValorFactura(event)} 
                                    name="fechaFactura" 
                                    type="date" 
                                    variant="outlined" 
                                    InputProps={{inputProps: { min: fechaMinGasto() , max:  fechaMaxNow() } }}
                                    error={Boolean(errors?.fechaFactura)}
                                    helperText={errors?.fechaFactura}
                                    FormHelperTextProps={{ style: {backgroundColor: "white"} }}
                                    />
                                </RightInputBox>

                                <LeftInputBox>
                                    <span className={classes.span}>Punto de venta</span>
                                    <TextField 
                                    className={classes.inputs} 
                                    id="puntoDeVenta" 
                                    value={factura.puntoDeVenta || ''} 
                                    onChange={(event) => actualizarValorFactura(event)} 
                                    name="puntoDeVenta"
                                    variant="outlined" 
                                    error={Boolean(errors?.puntoDeVenta)}
                                    helperText={errors?.puntoDeVenta}
                                    inputProps={{ maxLength: 4 }}
                                    onInput={ handleOnlyNumbers }
                                    FormHelperTextProps={{ style: {backgroundColor: "white"} }}
                                    />
                                </LeftInputBox>

                                <RightInputBox>
                                    <span className={classes.span}>Numero de factura</span>
                                    <TextField 
                                    className={classes.inputs} 
                                    id="numeroFactura" 
                                    value={factura.numeroFactura || ''} 
                                    onChange={(event) => actualizarValorFactura(event)} 
                                    name="numeroFactura" 
                                    variant="outlined" 
                                    error={Boolean(errors?.numeroFactura)}
                                    helperText={errors?.numeroFactura}
                                    inputProps={{ maxLength: 8 }}
                                    onInput={ handleOnlyNumbers }
                                    FormHelperTextProps={{ style: {backgroundColor: "white"} }}
                                    />
                                </RightInputBox>

                                <LeftInputBox>
                                    <span className={classes.span}>Cuit Proveedor</span>
                                    <TextField 
                                    className={classes.inputs} 
                                    id="cuitProveedor" 
                                    value={factura.cuitProveedor || ''} 
                                    onChange={(event) => actualizarValorFactura(event)}
                                    name="cuitProveedor" 
                                    variant="outlined" 
                                    error={Boolean(errors?.cuitProveedor)}
                                    helperText={errors?.cuitProveedor}
                                    inputProps={{ maxLength: 11 }}
                                    onInput={ handleOnlyNumbers }
                                    FormHelperTextProps={{ style: {backgroundColor: "white"} }}
                                    />
                                </LeftInputBox>

                                <RightInputBox>
                                    <span className={classes.span}>Cuit Receptor</span>
                                    <TextField 
                                    className={classes.inputs} 
                                    id="cuitReceptor" 
                                    value={factura.cuitReceptor || ''} 
                                    onChange={(event) => actualizarValorFactura(event)} 
                                    name="cuitReceptor" 
                                    variant="outlined" 
                                    error={Boolean(errors?.cuitReceptor)}
                                    helperText={errors?.cuitReceptor}
                                    inputProps={{ maxLength: 11 }}
                                    onInput={ handleOnlyNumbers }
                                    FormHelperTextProps={{ style: {backgroundColor: "white"} }}
                                    />
                                </RightInputBox>

                                <LeftInputBox>
                                    <span className={classes.span}>CAE</span>
                                    <TextField 
                                    className={classes.inputs} 
                                    id="cae" 
                                    value={factura.cae || ''} 
                                    onChange={(event) => actualizarValorFactura(event)} 
                                    name="cae" 
                                    variant="outlined" 
                                    error={Boolean(errors?.cae)}
                                    helperText={errors?.cae}
                                    inputProps={{ maxLength: 14 }}
                                    onInput={ handleOnlyNumbers }
                                    FormHelperTextProps={{ style: {backgroundColor: "white"} }}
                                    />
                                </LeftInputBox>

                                <RightInputBox>
                                    <span className={classes.span}>Importe</span>
                                    <TextField 
                                    className={classes.inputs} 
                                    id="importe" value={factura.importe || ''} 
                                    onChange={(event) => actualizarValorFactura(event)} 
                                    name="importe" 
                                    variant="outlined" 
                                    type="text" 
                                    error={Boolean(errors?.importeFactura)}
                                    helperText={errors?.importeFactura}
                                    inputProps={{ maxLength: 15 }}
                                    onInput={ handleOnlyNumbersDot }
                                    FormHelperTextProps={{ style: {backgroundColor: "white"} }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }}
                                    />
                                </RightInputBox>

                            </AccordionDetails>
                        </Accordion>
                    }
                </form>

            </FormBox>

            <RightFormBox>
                {creacion &&
                    <ButtonBox>
                        <StyledButtonPrimary className={classes.botones} onClick={() => createData()} >Crear gasto</StyledButtonPrimary>
                        <StyledButtonSecondary className={classes.botones} onClick={backToGastos}>Cancelar</StyledButtonSecondary>
                    </ButtonBox>
                }
                {edicion && !creacion &&
                    <ButtonBox>
                        {campoEditado &&
                            <StyledButtonPrimary className={classes.botones} onClick={updateData}>Guardar cambios</StyledButtonPrimary>
                        }
                        {!campoEditado &&
                            <StyledButtonPrimary className={classes.botonesDisabled} disabled>Guardar cambios</StyledButtonPrimary>
                        }
                        <StyledButtonSecondary className={classes.botones} onClick={popupModal}>Eliminar gasto</StyledButtonSecondary>
                    </ButtonBox>
                }
                <Divider className={classes.divider} />

                {edicion && !creacion &&
                    <Historial tipo='GASTO' id={params.id} update={cambiosGuardados} />
                }

            </RightFormBox>

            <SnackbarComponent snackColor={snackColor} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)} />

            <ModalComponent openModal={openModal} bodyModal={bodyModal} handleCloseModal={() => setOpenModal(false)} />

        </RootBoxABM>

    )
}
