import React from "react";
import '../card.css';
import firebase from "../Config/firebase";

import Productos from "../Components/Productos";

function Card(){
    console.log(firebase)
    return(
        <Productos/>
    )
}

export default Card;