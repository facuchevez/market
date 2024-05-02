import { useState } from "react";
import { useForm } from "react-hook-form";
import AlertCustom from "../Components/AlertCustom";
import firebase from "../Config/firebase";
import { registroMessage } from "../Utils/errorMessage";
import {useNavigate} from "react-router-dom"

const styles = {
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center'
    }
}
function Registro(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [alert, setAlert] = useState({variant:'', text:'', icono:''});
    const navigate = useNavigate()

    const onSubmit = async data => {
        console.log(data)
        try{
            const responseUser = await firebase.auth().createUserWithEmailAndPassword(data.email,data.password)
            console.log("responseUser",responseUser.user.uid)
            if(responseUser.user.uid){
                const document = await firebase.firestore().collection("usuarios")
                .add({
                    nombre: data.nombre,
                    apellido: data.apellido,
                    userId: responseUser.user.uid
                })
                console.log(document)
                if(document){
                    setAlert({ icon:`🎉`, variant:'alert-success alert shadow-lg justify-center', text:'Gracias por registrarse!',})
                    setTimeout(()=>{
                        navigate('/ingresar')
                    },1400)
                    
                }
            }
        }catch(e){
            console.log(e)
            setAlert({ icon:`👎`, variant:'alert-error alert shadow-lg justify-center', text: registroMessage[e.code] || 'Ha ocurrido un error',})
        }
    }
    
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card w-96 flex-shrink-0 max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <h3 style={styles.title}>Registro</h3>
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
                                    <span className="label-text">Apellido</span>
                                </label>
                                <input className="input input-bordered" type="text" {...register("apellido", { required: true })}></input>
                                {errors.apellido && <span className="text-red-500 text-xs">Campo requerido</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input className="input input-bordered" type="email" {...register("email", { required: true })}></input>
                                {errors.email && <span className="text-red-500 text-xs">Campo requerido</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Contraseña</span>
                                </label>
                                <input className="input input-bordered" type="password" {...register("password", { required: true,minLength:6,maxLength:15})}></input>
                                {errors.password?.type === "required" && <span className="text-red-500 text-xs">Campo requerido</span>}
                                {errors.password?.type === "minLength" && <span className="text-red-500 text-xs">Tiene que tener al menos 6 caracteres</span>}
                                {errors.password?.type === "maxLength" && <span className="text-red-500 text-xs">No puede tener mas de 15 caracteres</span>}
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Registrarse</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Registro;