import { useContext } from "react";
import { Link } from "react-router-dom";
import avatar from '../avatar.png';
import { AuthContext } from "../Context/AuthContext";

function Header(){
    const context = useContext(AuthContext)
    return(
        <div className="navbar bg-base-100 sticky top-0 z-10">
            <div className="navbar-start">
                <button className="btn btn-ghost normal-case text-xl"><Link to="/"><i className="fa-solid fa-store"></i> Market</Link></button>
            </div>
            <div className="navbar-end">
                {
                    !context.login &&
                    <div className="btn-group mr-4">
                        <button className="btn"><Link to="/alta">Registrarse</Link></button>
                        <button className="btn  btn-active"><Link to="/ingresar"><i className="fa-solid fa-right-to-bracket"></i> Ingresar</Link></button>
                    </div>
                }

                {
                    context.login &&
                    <>
                    <p className="text-lg mr-2">Hola <b>{context.user.nombre}!</b></p>
                    <div className="dropdown dropdown-end">
                        <div className="avatar online mr-2 cursor-pointer btn btn-ghost btn-circle" tabIndex="0">
                            <div className="w-10 rounded-full">
                                <img src={avatar} alt="Avatar personal"/>
                            </div>
                        </div>
                        <ul tabIndex="0" className="mt-3 p-4 shadow-xl menu menu-compact dropdown-content bg-base-100 rounded-box w-64">
                            <li>
                                <button className="btn btn-outline btn-success mb-2"><Link to="/producto/alta"><i className="fa-solid fa-plus"></i> Alta de producto</Link></button>
                            </li>
                            <li>
                                <button className="btn btn-outline btn-error" onClick={context.handlerLogout}> <i className="fa-solid fa-right-from-bracket"></i> Salir</button>
                            </li>
                        </ul>
                    </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Header;