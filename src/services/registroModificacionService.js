import axios from 'axios'
import { RegistroModificacion } from '../domain/registroModificacion'
import { REST_SERVER_URL } from './configuration'

class RegistroModificacionService {

    async getByTipoYId(tipo, id) {
        const registros = await axios.get(`${REST_SERVER_URL}/registroModificacion?tipoRegistro=${tipo}&idModificado=${id}`)
        return registros.data.map(registro => RegistroModificacion.fromJson(registro))
    }

}

export const registroModificacionService = new RegistroModificacionService()