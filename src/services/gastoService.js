import axios from 'axios'
import { Gasto } from '../domain/gasto'
import { REST_SERVER_URL } from './configuration'


class GastoService{

    gastoAJson(JSON) {
        return Gasto.fromJson(JSON)
    }

    async getAll() {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/gastos`)
        return listaJSON.data
    }


    gastosVista = [
        new Gasto(1, "Extraordinaria","Reparacion de elevador", 12000, "Mayo 2021"),
        new Gasto(2, "Extraordinaria","Reparacion de elevador", 12000, "Mayo 2021"),
        new Gasto(3, "Extraordinaria","Reparacion de elevador", 12000, "Mayo 2021"),
        new Gasto(4, "Extraordinaria","Reparacion de elevador", 12000, "Mayo 2021"),
        new Gasto(5, "Extraordinaria","Reparacion de elevador", 12000, "Mayo 2021")
    ]
}

export const gastoService = new GastoService()