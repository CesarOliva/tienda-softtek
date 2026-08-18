import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css'
import pato from './assets/pato.jpg';


const products = [
    {
        id: 1,
        nombre: "Producto uno",
        precio: 556,
        stock: 1,
        imagen: pato
    },
    {
        id: 2,
        nombre: "Producto dos",
        precio: 300,
        stock: 2,
        imagen: pato
    },
    {
        id: 3,
        nombre: "Producto tres",
        precio: 750,
        stock: 0,
        imagen: pato
    }
];



  function ProductList(){
    return(
      <div>
        <h2>Lista</h2>
        <div className='Product'>
        {products.map((product) => (
          <ProductCard key={product.id} product = {product} />
        ))}
        </div>
      </div>
    )
  }

  export default ProductList;
