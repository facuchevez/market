import React, {useState,useEffect} from "react";
import { getAll } from "../Services/productosService";
import Producto from "./Producto";

import Loading from "./Loading/Loading";

function Productos(){
    const [productos,setProductos] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [buscar,setBuscar] = useState('iPhone')
    
    useEffect(
        ()=>{
            const result = async () => {
                try{
                    const productos = await getAll(buscar)
                    setProductos(productos)
                    setIsLoading(false)
                }catch(e){
                    console.log(e)
                }
            }
            result()
        },
        [buscar]
    )
    
    
    return(
        <>  
            <Loading loading={isLoading}>
                <div className="form-control m-8">
                    <div className="input-group flex justify-between">
                        <input type="text" value={buscar} onChange={(e)=>setBuscar(e.target.value)} className="input input-bordered w-full"/>
                        <button className="btn btn-square btn-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
                <div className="flex flex-wrap gap-4 justify-center pb-4">
                    {productos.map(e => <Producto key={e.id} {...e.data()} id={e.id} />)}
                </div>
            </Loading>
        </>
    )
    
}

export default Productos;