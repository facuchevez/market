import { useForm } from "react-hook-form";
import firebase from "../Config/firebase";
import AlertCustom from "../Components/AlertCustom";
import { useState } from "react";
import {useNavigate} from "react-router-dom"

function ProductosAlta(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [alert, setAlert] = useState({variant:'', text:'', icono:''});
    const navigate = useNavigate()

    const onSubmit = async data => {
        console.log(data)
        try{
            const document = await firebase.firestore().collection("productos")
            .add(data)
            console.log(document)
            setAlert({ icon:`🥳`, variant:'alert-info alert shadow-lg justify-center', text:'Producto agregado!',})
            setTimeout(()=>{
                navigate('/')
            },1500)
        }catch(e){
            console.log(e)
            setAlert({ icon:`😭`, variant:'alert-error alert shadow-lg justify-center', text:'Ha ocurrido un error',})
        }
    }

    return(
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
                            
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-success">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default ProductosAlta;