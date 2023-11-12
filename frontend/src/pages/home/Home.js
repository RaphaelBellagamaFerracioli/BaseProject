import React, { useEffect, useState } from 'react'; // Importe useState aqui
import "./Home.css";

// components
import LikeContainer from "../../componnents/LikeContainer";
import PhotoItem from "../../componnents/PhotoItem";
import { Link } from "react-router-dom";
import Carrousel from '../../componnents/Carrousel';

// hooks
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { getPhotos, like } from "../../slices/photoSlice";

const Home =() => {
  const dispatch = useDispatch();

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  // Load all photos
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  const handleLike = (photo = null) => {
    dispatch(like(photo._id));
    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  // Calcula o total de páginas
  const totalPages = Math.ceil(photos.length / itemsPerPage);
  // Calcula quais fotos devem ser exibidas na página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPhotos = photos.slice(indexOfFirstItem, indexOfLastItem);

  // Muda para a próxima página
  const nextPage = () => {
    setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
  };

  // Muda para a página anterior
  const prevPage = () => {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  };

  return (
    <div className='Home' id="home">
      <div className='Carrosel-boodstrap'>
        <Carrousel></Carrousel>
      </div>

      {currentPhotos && currentPhotos.map((photo) => (
        <div className='content' key={photo._id}>
          <PhotoItem photo={photo} />
          
          {/* <LikeContainer photo={photo} user={user} handleLike={handleLike} /> */}

          <Link className="btn" to={`/photos/${photo._id}`}>
            Ver mais
          </Link>
          

        </div>
      ))}
      <div className="pagination">
        <br></br>
        <br></br>
        <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>Próximo</button>
      </div>
      
      
      {photos && photos.length === 0 && (

        <h2 className="no-photos">
          Ainda não há fotos publicadas,{" "}
          <Link to={`/users/${user.userId}`}>clique aqui</Link> para começar.
        </h2>
      )}
    </div>
  );
}

export default Home;