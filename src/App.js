import "./App.css";

import Cars from "./hooks/Cars";

import { useState, useEffect } from "react";

// 4 - custom hook
import { useFetch } from "./hooks/useFetch";

// 8 - errar url para mostrar erro
// "http://localhost:3001/products"
const url = "http://localhost:3000/products";

const cars = [
  { id: 1, brand: 'VW', model: 'Gol', year: 2000, km: 340000 },
  { id: 2, brand: 'Hyundai', model: 'HB20', year: 2018, km: 25000 },
  { id: 3, brand: 'Fiat', model: 'Palio', year: 1998, km: 450000 },
  { id: 4, brand: 'Renault', model: 'Sandero', year: 2010, km: 98000 },
  { id: 5, brand: 'Chevrolet', model: 'Onix', year: 2019, km: 53000 }
]
function App() {
  const [products, setProducts] = useState([]);

  // 4 - custom hook e 5 - refactor post
  const { data: items, httpConfig, loading, error } = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 1 - resgatando dados
  // useEffect(async () => {
  //   const res = await fetch("http://localhost:3000/products");

  //   const data = await res.json();

  //   setProducts(data);
  // }, []);

  // 2 - add product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    };

    // const res = await fetch("http://localhost:3000/products", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(product),
    // });

    // const addedProduct = await res.json();

    // 3 - carregamento dinâmico
    // setProducts((prevProducts) => [...prevProducts, addedProduct]);

    // 5 - refatorar post
    httpConfig(product, "POST");

    setName("");
    setPrice("");
  };

  /* 9 - desafio */
  const handleRemove = (id) => {
    httpConfig(id, "DELETE");
  };

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      {/* 6 - state de loading */}
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      <ul>
        {items &&
          items.map((product) => (
            <li key={product.id}>
              {product.name} - R$: {product.price}
              {/* 9 - desafio */}
              <button onClick={() => handleRemove(product.id)}>Excluir</button>
            </li>
          ))}
      </ul>

      <div className="add-product">
        <p>Adicionar produto:</p>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {/* 7 - state de loading no post */}
          {loading ? <p>Aguarde!</p> : <input type="submit" value="Criar" />}
        </form>
      </div>
      
      <h1>Carros</h1>
      {cars.map(car => (
        <Cars
          key={car.id}
          brand={car.brand}
          model={car.model}
          year={car.year}
          km={car.km}
        />
      ))}
   

    </div>
  );
}

export default App;