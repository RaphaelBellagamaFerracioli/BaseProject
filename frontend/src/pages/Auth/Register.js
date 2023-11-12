import "./Auth.css";
import React from 'react'
import logo from "../../componnents/assets/Armored (6).png"
// Components
import {Link} from "react-router-dom"
import Message from "../../componnents/Message";
// Redux
import { register, reset } from "../../slices/authSlice";

import {useSelector, useDispatch} from "react-redux"

//hooks
import { useState, useEffect } from "react";

const Register = () => {
 
  const [name, setName] =useState("");
  const [email, setEmail] =useState("");
  const [password, setPassword] =useState("");
  const [confirmPassword, setConfirmPassword] =useState("");

  const  dispatch = useDispatch();

  const {loading, error} = useSelector((state) => state.auth);//pega o estado
  
    const handleSubmit = (e) =>{
        e.preventDefault();//previne o evento de envio de formulario

        const user = {
          name,
          email,
          password, 
          confirmPassword

        };
        
        console.log(user);

        dispatch(register(user))
        
    };

    //vai zerar tudo pra pegar os dados de uma nova requisição
    useEffect(()=>{
      dispatch(reset());
    }, [dispatch])

  return (

    <div  id="register">
      <div className="login">
         <h2><i>Agroblog</i></h2>
          <img src={logo}></img>
          </div>
        <p className="subtitulo">Venha se cadastrar no nosso site</p>
        <form onSubmit={handleSubmit}>

            <input type="text" placeholder="Digite seu nome aqui" onChange={(e) => setName(e.target.value)} value={name || ""}></input>
            <input type="email" placeholder="Digite seu email" onChange={(e) => setEmail(e.target.value)} value={email || ""}></input>
            <input type="password" placeholder="Crie uma senha" onChange={(e) => setPassword(e.target.value)} value={password || ""}></input>
            <input type="password" placeholder="Comfirmar senha" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword || ""}></input>
            
           {!loading && <input type="submit" value="Cadastrar"></input>}
           {loading && <input type="submit" value="Aguarde..." disabled></input> }
           {error && <Message msg={error} type={error}></Message>}
        </form>
        Já tem uma conta ?<Link to="/login"><i>Venha fazer Login</i></Link>
    </div>
  )
}

export default Register
