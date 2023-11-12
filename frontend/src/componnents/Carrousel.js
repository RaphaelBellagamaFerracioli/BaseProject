
import React from 'react';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import image1 from './assets/Agro1.jpg'; 
import image2 from './assets/agro2.jpeg';
import image3 from './assets/agro3.jpeg';
import image4 from './assets/agro4.jpeg';

//style do carrousel
import "./Carrousel.css"

const Carrousel = () => {
  return (
    <div>
    <h4 className='title'>Venha conehcer nosso canal de noticias, e se informar sobre tudo que acontece no meio agro</h4>
    <ResponsiveCarousel>
      <div className='container1'>
        <img src={image1} alt="Imagem 1" />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src={image2} alt="Imagem 2" />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src={image4} alt="Imagem 3" />
        <p className="legend">Legend 3</p>
      </div>
      <div>
        <img src={image3} alt="Imagem 4" />
        <p className="legend">Legend 4</p>
      </div>
    </ResponsiveCarousel>
  </div>
  )
}

export default Carrousel
