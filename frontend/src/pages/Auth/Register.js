import "./Auth.css";
import React from 'react'
// Components
import {Link} from "react-router-dom"

//hooks
import { useState, useEffect } from "react";

const Register = () => {
    const handleSubmit = (e) =>{
        e.preventDefault();//previne o evento de envio de formulario

    }
  return (

   

    <div>
        <h2>Blog</h2>
        <p className="subtitulo">Venha se cadastrar no nosso site</p>
        <form>

            <input type="text" placeholder="Nome"></input>
            <input type="email" placeholder="Email"></input>
            <input type="password" placeholder="Senha"></input>
            <input type="password" placeholder="Comfirmar senha"></input>
            <input type="submit" value="Cadastrar"></input>
        </form>
        Já tem uma conta ?<Link to="/login">Venha fazer Login</Link>
    </div>
  )
}

export default Register
