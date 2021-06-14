import axios from 'axios'
import { REST_SERVER_URL } from './configuration'
import { DepartamentoVistaDTO, Departamento } from '../domain/departamento'

class DepartamentoService {

    // ------ DATOS DE PRUEBA ---------
    deptosVistaDTOprueba = [
        new DepartamentoVistaDTO(1, 2, "B","Roberto Gomez","Sandra Sanchez",300,true),
        new DepartamentoVistaDTO(2,3,"A","Francisco Wirtz","José Sand",300,false),
        new DepartamentoVistaDTO(3,1,"A","Radamel Falcao","Alberto Fernandez",300,false),
        new DepartamentoVistaDTO(4,7,"H","Mauricio Lacarda","Manuel Belgrano",300,false),
        new DepartamentoVistaDTO(5,6,"H","José de San Martín","Leandro Sir",300,false),
        new DepartamentoVistaDTO(6,8,"C","Joaquín Sabina","Joan Gomez",300,false),
        new DepartamentoVistaDTO(7,1,"H","Sabrina Bueno","Rodrigo Bueno",300,false)
    ]
    // ------------------------------

    async getAllDeptos() {
        return this.deptosVistaDTOprueba
    }
}

export const departamentoService = new DepartamentoService()