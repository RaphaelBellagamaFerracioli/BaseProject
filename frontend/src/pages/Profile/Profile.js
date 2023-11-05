import "./Profile.css";

import React from 'react'

import { uploads } from "../../utils/config";

//componnents
import Message from "../../componnents/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

// hooks
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getUserDetails } from "../../slices/userSlice";
import { publishPhoto, 
          resetMessage,
          getUserPhotos,
          deletePhoto,
          updatePhoto
          }
            from "../../slices/photoSlice";



function Profile() {

  const {id} = useParams()

  const dispatch =  useDispatch()

  const {user,loading} = useSelector((state) => state.user)

  const {user: userAuth} = useSelector((state) => state.auth)


  const {photos, loading: loadingPhoto,
                  message: messagePhoto,
                    error: errorPhoto,
                      } = useSelector((state) =>state.photo)


  const [title, setTitle] = useState();
  const [image, setImage] = useState();

   const [editId, setEditId] = useState();
   const [editImage, setEditImage] = useState();
   const [editTitle, setEditTitle] = useState();


    //formulario de edição
    const newPhotoForm = useRef()
    const editPhotoForm = useRef()
  

  //faz o loading do conteudo do usuario

  useEffect(() => {

    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  },[dispatch, id]);

  function resetComponentMessage() {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  }

  const submitHandle = (e) =>{
    e.preventDefault()

    const photoData = {

      title, image

    }
    const formData = new FormData()

    const photoFormData = Object.keys(photoData).forEach((key) =>

    formData.append(key, photoData[key])

    );
    formData.append("photo", photoFormData);

    dispatch(publishPhoto(formData));

    setTitle("");

    resetComponentMessage();
  }



  //faz o submit da imagem
  const handleFile = (e) =>{

    const image = e.target.files[0];
   
    setImage(image);

  }
   // Cancel editing
   const handleCancelEdit = (e) => {
    
    e.preventDefault()

  };

  //função para exibir o formulario de edição de um post especifico
  const hideOrShowForms = () => {
        //e tiver sendo exibido ele adiciona o hide se não ele tira o hide 

        //o hide aqui faz a exposição do formulario
        newPhotoForm.current.classList.toggle("hide")
        editPhotoForm.current.classList.toggle("hide")

  }


  const handleEdit = (photo) =>{

    if (editPhotoForm.current.classList.contains("hide")) {

      hideOrShowForms();

    }

    setEditId(photo._id)
    setEditTitle(photo.title)
    setEditImage(photo.image)
  }

  const handleUpdate =(e)=>{

  e.preventDefault()

  const photoData ={

      title: editTitle,
      id: editId

  }

  dispatch(updatePhoto(photoData))
  
  resetComponentMessage()

  }

  const handleDelete = (id) => {
    dispatch(deletePhoto(id));

    resetComponentMessage();
  };

 
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
            
              <div className="new-photo" ref={newPhotoForm}>

                <h3>Compartilhe seu conteudo aqui:</h3>
              <form onSubmit={submitHandle}>
              <label>
                <span>Titulo para o conteudo:</span>
                <input type="text" placeholder="insira um titulo" onChange={(e) => 
                  
                  setTitle(e.target.value)} value={title || ""}></input>
              </label>
              <label>
                <span>Imagem do post:</span>
                <input type="file" onChange={handleFile}></input>
              </label>
              {!loadingPhoto && <input type="submit" value="Postar"></input>}
              {loadingPhoto && (<input type="submit" disabled value="Aguarde..."></input>)}
              </form>
              </div>

              <div className="edit-photo hide" ref={editPhotoForm}>
            <p>Editando:</p>
            {editImage && (
              <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
            )}
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Insira um novo titulo"
                onChange={(e) => setEditTitle(e.target.value)}
                value={editTitle || ""}
              />
              <input type="submit" value="Atualizar" />
              <button className="cancel-btn" onClick={handleCancelEdit}>
                Cancelar edição
              </button>
            </form>
          </div>

              {errorPhoto && <Message msg={errorPhoto} type="error"></Message>}
              {messagePhoto && <Message msg ={messagePhoto} type="success"></Message>}
            </>
          )}

          <div className="user-photos">
              <h2>Fotos publicadas:</h2>

              {photos && photos.map((photo) => (
              <div className="photo" key={photo._id}>
          {photo.image && (

          <img src={`${uploads}/photos/${photo.image}`} alt={photo.title}></img>
          )}

            {id === userAuth._id ?
            
            (<div className="actions">

                <Link  to={`/photos/${photo._id}`}>

                  <BsFillEyeFill ></BsFillEyeFill>

                </Link>
                <BsPencilFill onClick={() => handleEdit(photo)}></BsPencilFill>
                <BsXLg onClick={()=> handleDelete(photo._id)}></BsXLg>

            </div>
            ):(
            
            <Link className="btn" to={`/photos/${photo._id}`}>Ver</Link>
            
            )}
            </div>
        ))}
          {photos.lenght === 0 && <p>Ainda não a fotos</p>}
             </div> 
    </div>
  )
}

export default Profile
