import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const styles = {
    image: {
        width: '18rem',
        height: '18rem',
        objectFit: 'cover'
    },
    card: {
        padding: '20px'
    },
    cardActions: {
        display: 'grid',
        gridTemplateColumns: '1fr auto'
    }
}

function Producto({
    id,
    nombre, 
    precio,
    descripcion, 
    imagen
}){
    const context = useContext(AuthContext)
    return(
        <div className="card w-72 bg-base-100 shadow-xl">
            <figure><img style={styles.image} src={imagen} alt={`imagen del producto ${nombre}`} /></figure>
            <div className="card-body" style={styles.card}>
                <h2 className="card-title">
                    {nombre}
                    <div className="badge badge-accent">${precio}</div>
                </h2>
                <p>{descripcion}</p>
                <div className="card-actions justify-start">
                    <div className="badge badge-outline">Tecnología</div> 
                    <div className="badge badge-outline">Apple</div>
                </div>
                <div className="card-actions mt-4" style={styles.cardActions}>
                    <button className="btn btn-primary"><Link to={`/producto/${id}`}>Ver producto</Link></button>
                    {
                        context.login &&
                        <div className="tooltip tooltip-left" data-tip="Editar producto">
                            <button className="btn btn-secondary"><Link to={`/producto/editar/${id}`}><i className="fa-solid fa-edit"></i></Link></button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Producto;