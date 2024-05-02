import { Route, Routes } from "react-router-dom";
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Registro from '../Pages/Registro';
import NotFound from '../Pages/NotFound';
import Detalle from "../Pages/Detalle";
import ProductosAlta from "../Pages/ProductosAlta";
import ProductosModificar from "../Pages/ProductosModificar";
import Checkout from "../Pages/Checkout";

function Public(){
    return(
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/alta' element={<Registro/>} />
            <Route path='/ingresar' element={<Login/>} />
            <Route path='/producto/:id' element={<Detalle/>} />
            <Route path='/producto/alta' element={<ProductosAlta/>} />
            <Route path='/producto/editar/:id' element={<ProductosModificar/>} />
            <Route path='/checkout/:id' element={<Checkout/>} />
            <Route path='*' element={<NotFound/>} /> 
        </Routes>
    )
}

export default Public;