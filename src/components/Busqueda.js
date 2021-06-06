import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


export const Busqueda = ({busqueda, titulo}) =>{
    const [textoIngresado, setTextoIngresado] = useState('')

    return (
        <div className="flex fondosecundario justify-center">
           <div className="flex flex-col pt-6 container">
                <div className="flex text-lg mb-2 p-text-left font-bold">
                    <h1>Búsqueda de {titulo}</h1>
                </div>
                <div >
                        <div className="flex">
                            <input className="input-busqueda" placeholder="Busqueda.." value={textoIngresado} onChange={(event) => setTextoIngresado(event.target.value)} />
                            <FontAwesomeIcon icon={faSearch} className="input-button" onClick={() => busqueda(textoIngresado, soloActivas)} />
                        </div>
                        <input className="my-4" type="checkbox" id="cbox" value="second_checkbox" checked={soloActivas}  onChange={toggleChange}/> <label htmlFor="cbox">Sólo activas</label>
                 </div>
            </div>
        </div>
    )
}