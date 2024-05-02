import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProducto } from "../Services/productosService"
import AlertCustom from "../Components/AlertCustom"
import {useNavigate} from "react-router-dom"
import Loading from "../Components/Loading/Loading"

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
    table: {
        width: '60rem',
    },
    title: {
        fontSize: '30px',
        fontWeight: 'bold'
    }
}

function Checkout(){
    const {id} = useParams()
    const [producto,setProducto] = useState({})
    const [alert, setAlert] = useState({variant:'', text:'', icono:''});
    const navigate = useNavigate()
    const [isLoading,setIsLoading] = useState(true)

    useEffect(
        ()=>{
            const result = async () => {
                try{
                    const productoData = await getProducto(id)
                    if(productoData){
                        setProducto(productoData.data())
                        setIsLoading(false)
                    }
                    
                }catch(e){
                    console.log(e)
                }
            }
            result()
        },
        [id]
    )

    const confirmarCompra = e => {
        setAlert({ icon:`😀`, variant:'alert-success alert shadow-lg justify-center', text:'¡Gracias por su compra!',})
        setTimeout(()=>{
            navigate('/')
        },1200)
    }

    return(
        <Loading loading={isLoading}>
            <div style={styles.wrapper}>
                <h3 style={styles.title}>Checkout</h3>
                <div className="overflow-x-auto w-full" style={styles.table}>
                    <AlertCustom {...alert}/>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Descripcion</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={producto.imagen} alt="imagen del producto" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{producto.nombre}</div>
                                            <div className="text-sm opacity-50">{producto.descripcion}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{producto.descripcion}</td>
                                
                                <th>
                                    <button className="badge badge-success">${producto.precio}</button>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                    <button className="btn btn-primary w-full mt-4" onClick={confirmarCompra}>Finalizar compra</button>
                </div>
            </div>
        </Loading>
    )
}

export default Checkout;