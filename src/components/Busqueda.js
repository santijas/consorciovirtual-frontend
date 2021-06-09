import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


export const Busqueda = ({busqueda}) =>{
    const [textoIngresado, setTextoIngresado] = useState('')

    return (
        <div className="">
           <div className="">
                <div >
                    <div className="">
                        <input className="" placeholder="Busqueda.." value={textoIngresado} onChange={(event) => setTextoIngresado(event.target.value)} />
                    </div>
                 </div>
            </div>
        </div>
    )
}