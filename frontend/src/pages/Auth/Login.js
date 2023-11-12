import "./Auth.css";
 import React from 'react'
 
 // Components
import { Link } from "react-router-dom";
import Message from "../../componnents/Message";
import logo from "../../componnents/assets/Armored (6).png"

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { login, reset } from "../../slices/authSlice";

 function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    
      const user = {
        email,
        password,
      };

      console.log(user);

      dispatch(login(user));
    };


    // Clean all auth states
    useEffect(() => {
      dispatch(reset());
    }, [dispatch]);

   return (
    <div className="login" id="login">
      <h2><i>Agroblog</i></h2>
      <img src={logo}></img>
      <p className="subtitle">Faça o login para ver o que há de novo.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {!loading && <input type="submit" value="Entrar" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Não tem uma conta? <Link to="/register">Clique aqui</Link>
      </p>
    </div>
   )
 }
 
 export default Login
 