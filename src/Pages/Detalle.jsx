import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getById } from "../Services/productosService";

import Loading from "../Components/Loading/Loading";

const styles = {
    wrapper: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%',
        position: 'absolute',
        top: '0'
    },
    image: {
        width: '300px'
    },
    card: {
        width: '600px'
    }
}

function Detalle(){
    const {id} = useParams()
    const [producto,setProducto] = useState({})
    const [isLoading,setIsLoading] = useState(true)
    
    useEffect(
        ()=>{
            const result = async () => {
                try{
                    const productoData = await getById(id)
                    if(productoData){
                        setProducto(productoData.data())
                    }
                    setIsLoading(false)
                }catch(e){
                    console.log(e)
                }
            }
            result()
        },
        [id]
    )

    return(
        <Loading loading={isLoading}>
            <div style={styles.wrapper}>
                <div className="card card-side bg-base-100 shadow-xl" style={styles.card}>
                    <figure><img src={producto.imagen} style={styles.image} alt="Imagen del producto"/></figure>
                    <div className="card-body">
                        <h2 className="card-title">{producto.nombre}</h2>
                        <div className="badge badge-secondary">${producto.precio}</div>
                        <p>{producto.descripcion}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary w-full"><Link to={`/checkout/${id}`}><i className="fa-solid fa-cart-shopping"></i> Agregar al carrito</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </Loading>
    )
}
    
export default Detalle;