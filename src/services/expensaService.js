import axios from 'axios'
import { REST_SERVER_URL } from './configuration'
import { ExpensaVistaDTO } from '../domain/expensa'

class ExpensaService {

    // ------ DATOS DE PRUEBA ---------
    expensasVistaDTOprueba = [
        new ExpensaVistaDTO(1, "Diciembre 2021" ,"2ºB",true,3700,true),
        new ExpensaVistaDTO(2, "Noviembre 2021","1ºA",false,2300,false),
        new ExpensaVistaDTO(3,"Abril 2021","5ºA",false,6300,false),
        new ExpensaVistaDTO(4,"Abril 2021","3ºH",true,1300,false),
        new ExpensaVistaDTO(5,"Abril 2021","9ºH",true,3300,false),
        new ExpensaVistaDTO(6,"Marzo 2021","1ºC",false,2300,true),
        new ExpensaVistaDTO(7,"Mayo 2021","2ºH",true,1300,false)
    ]
    // ------------------------------

    async getAllExpensas() {
        return this.expensasVistaDTOprueba
    }
}

export const expensaService = new ExpensaService()