import "./PhotoItem.css";

import { uploads } from "../utils/config";

import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PhotoItem = ({ photo }) => {
  return (
    <Container>
      <div className="Post-individual">
        <div className="photo-item">
        <Row>
          <Col>
          <h2>{photo.title}</h2>
          {photo.image && (
            <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
          )}
          <p>{photo.conteudo}</p>
          
          <p className="photo-author">
            Publicada por:{" "}
            <Link className="" to={`/users/${photo.userId}`}>{photo.userName}</Link>
          </p>
          </Col>
        </Row>
        </div>
        </div>
    </Container>
  );
};

export default PhotoItem;