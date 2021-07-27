import 'moment/locale/es'
import moment from 'moment';
import { isAfter } from 'date-fns';

export const formatDate = (date) =>{
    const fecha = moment(date).format('MMMM YYYY').toUpperCase()
    const lower = fecha.toLowerCase();
    return fecha.charAt(0).toUpperCase() + lower.slice(1);
  }


export const splitTipo = (string) =>{
  const division = string.split("_").join(" ")
  return division
}

export const splitVisual = (string) =>{
  const division = string.split("_")
  return division.join(" ")
}

export const obtenerPeriodoDeMoment = (fecha) =>{
  let mes  
    if( moment(fecha).month() < 10 ){
       mes = "0"+(moment(fecha).month()+1)
    }else{
      mes = moment(fecha).month() + 1
    }
    return `"${moment(fecha).year()}-${mes}"`
}

export const dosDecimales = (num) =>{
  return Math.round(num * 100) / 100
}

export const numeroConPuntos = (numero) => {
  var parts = numero.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(",");
}

export const soloFecha = (fecha) => {
  return moment(fecha).format('DD/MM/YYYY')
}

export const horaYMinutos = (fecha) => {
  return moment(fecha).format('hh:mm')
}

export const fechaYaPaso = (fecha) =>{
  return moment(Date.now()).isAfter(fecha)
}

export const handleOnlyNumbers = (e) => {
  let esValido = new RegExp('^\\d+$')

  if (!esValido.test(e.target.value)) {
      e.target.value = e.target.value.slice(0, -1);
  }
};