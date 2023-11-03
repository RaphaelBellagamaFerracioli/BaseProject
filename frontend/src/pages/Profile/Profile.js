import "./Profile.css";

import React from 'react'

import { uploads } from "../../utils/config";


// hooks
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getUserDetails } from "../../slices/userSlice";

function Profile() {

  const {id} = useParams()

  const dispatch =  useDispatch()

  const {user,loading} = useSelector((state) => state.user)

  const {user: userAuth} = useSelector((state) => state.auth)

  //formulario de edição
  const newPhotoForm = useRef()
  const editPhotoForm = useRef()
  //faz o loading do conteudo do usuario

  useEffect(() => {

    dispatch(getUserDetails(id));

  },[dispatch, id]);
  
  if(loading){

    <p>Carregando...</p>
  }

  return (
    <div id="profile">
      <p>A onde ficaram os conteudos dos usuarios</p>
      <div className="profile-header">
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
          {id === userAuth._id && (

            <>
            
              <div className="new-photo" ref={newPhotoForm}></div>
                <h3>Compartilhe seu conteudo aqui:</h3>
              <form onSubmit={submitHandle}>
              <label>
                <span>Titulo para o conteudo:</span>
                <input type="text" placeholder="insira um titulo"></input>
              </label>
              <label>
                <span>Imagem do post:</span>
                <input type="file"></input>
              </label>
              <input type="submit" value="Postar"></input>
              </form>

            </>

          )}
    </div>
  )
}

export default Profile
