import React from 'react'

import style from '../style/styles.module.css'

const Cars = ({id,brand,model,year,km}) => {
  return (
    <div className={style.container}>
      <p>Codigo do carro:{id}</p>
      <p>Fabricante:{brand}</p>
      <p>Modelo:{model}</p>
      <p>Ano:{year}</p>
      <p>Km:{km}</p>
    </div>
  )
}

export default Cars
