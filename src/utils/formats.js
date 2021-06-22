import 'moment/locale/es'
import moment from 'moment';

export const formatDate = (date) =>{
    const fecha = moment(date).format('MMMM YYYY').toUpperCase()
    const lower = fecha.toLowerCase();
    return fecha.charAt(0).toUpperCase() + lower.slice(1);
  }


export const splitTipo = (string) =>{
  const division = string.split("_")
  return division[0]
}

export const splitVisual = (string) =>{
  const division = string.split("_")
  return division.join(" ")
}

export const obtenerPeriodoDeMoment = (fecha) =>{
  let mes  
    if( moment(fecha).month() < 10 ){
       mes = "0"+moment(fecha).month()
    }else{
      mes = moment(fecha).month()
    }
    console.log(moment(fecha).month())
    return `"${moment(fecha).year()}-${mes}"`
}