import { useForm } from "react-hook-form";
import firebase from "../Config/firebase";
import {useNavigate} from "react-router-dom"
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import AlertCustom from "../Components/AlertCustom";
import { loginMessage } from "../Utils/errorMessage";

const styles = {
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center'
    }
}

function Login(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const context = useContext(AuthContext)
    const [alert, setAlert] = useState({variant:'', text:'', icono:''});

    const onSubmit = async data => {
        console.log(data)
        try{
            const responseUser = await firebase.auth().signInWithEmailAndPassword(data.email,data.password)
            console.log("responseUser",responseUser.user.uid)
            if(responseUser.user.uid){
                const userDocument = await firebase.firestore().collection('usuarios')
                .where('userId','==',responseUser.user.uid)
                .get()
                
                const user = userDocument.docs[0].data()

                context.handlerLogin(user)
                setAlert({ icon:`😊`, variant:'alert-success alert shadow-lg justify-center', text:`Hola ${user?.nombre}!`,})
                setTimeout(()=>{
                    navigate('/')
                },2000)
            }
        }catch(e){
            console.log(e)
            setAlert({ icon:`👎`, variant:'alert-error alert shadow-lg justify-center', text: loginMessage[e.code] || 'Ha ocurrido un error',})
        }
    }
    
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card w-96 flex-shrink-0 max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <h3 style={styles.title}>Login</h3>
                            <AlertCustom {...alert}/>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input className="input input-bordered"  type="email" {...register("email", { required: true })}></input>
                                {errors.email && <span className="text-red-500 text-xs">Campo requerido</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Contraseña</span>
                                </label>
                                <input className="input input-bordered"  type="password" {...register("password", { required: true })}></input>
                                {errors.password && <span className="text-red-500 text-xs">Campo requerido</span>}

                                <label className="label">
                                    <a href="/#" className="label-text-alt link link-hover">¿Has olvidado tu contraseña?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-secondary">Iniciar sesión</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
    
}

export default Login;