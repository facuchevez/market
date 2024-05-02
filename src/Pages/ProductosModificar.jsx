import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { deleteProducto, getById, update } from "../Services/productosService";
import {useNavigate} from "react-router-dom"
import AlertCustom from "../Components/AlertCustom";

function ProductosModificar(){
    const {id} = useParams()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [alert, setAlert] = useState({variant:'', text:'', icono:''});
    const navigate = useNavigate()

    useEffect(
        ()=>{
            const result = async () => {
                try{
                    const productoData = await getById(id)
                    if(productoData){
                        setValue("nombre", productoData.data().nombre)
                        setValue("precio", productoData.data().precio)
                        setValue("descripcion", productoData.data().descripcion)
                        setValue("imagen", productoData.data().imagen)
                    }
                    
                }catch(e){
                    console.log(e)
                }
            }
            result()
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [id]
    )

    const onSubmit = async data => {
        console.log(data)
        try{
            const document = await update(id,data)
            console.log(document)

            setAlert({ icon:`🥳`, variant:'alert-success alert shadow-lg justify-center', text:'Producto modificado!',})
            setTimeout(()=>{
                navigate('/')
            },1200)
            
        }catch(e){
            console.log(e)
            setAlert({ icon:`😭`, variant:'alert-error alert shadow-lg justify-center', text:'Ha ocurrido un error',})
        }
    }

    const handleDelete = async () => {
        try {
            const document = await deleteProducto(id)
            console.log(document)
            setAlert({ icon:`👍`, variant:'alert-success alert shadow-lg justify-center', text:'Eliminado correctamente!',})
            setTimeout(()=>{
                navigate('/')
            },1000)
        }catch(e){
            console.log(e)
        }
    }

    return(
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card w-96 flex-shrink-0 max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <AlertCustom {...alert}/>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Nombre</span>
                                </label>
                                <input className="input input-bordered" type="text" {...register("nombre", { required: true })}></input>
                                {errors.nombre && <span className="text-red-500 text-xs">Campo requerido</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Precio</span>
                                </label>
                                <input className="input input-bordered" type="text" {...register("precio", { required: true })}></input>
                                {errors.precio && <span className="text-red-500 text-xs">Campo requerido</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Descripcion</span>
                                </label>
                                <input className="input input-bordered" type="text" {...register("descripcion", { required: true })}></input>
                                {errors.descripcion && <span className="text-red-500 text-xs">Campo requerido</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Imagen</span>
                                </label>
                                <input className="input input-bordered" type="text" {...register("imagen", { required: true })}></input>
                                {errors.imagen && <span className="text-red-500 text-xs">Campo requerido</span>}
                            </div>
                            
                            <div className="form-control mt-6 grid grid-cols-4 gap-2">
                                <button type="submit" className="btn btn-info col-span-3 gap-1"><i className="fa-solid fa-save"></i> Guardar</button>
                                <div className="tooltip tooltip-left" data-tip="Eliminar producto">
                                    <button type="button" className="btn btn-error" onClick={handleDelete}> <i className="fa-solid fa-trash-alt"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        </>
    )
}
export default ProductosModificar;