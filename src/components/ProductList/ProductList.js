import React from "react";
import { Product } from "..";

const ProductList = ({ products, compare, nameSearch }) => {
  const renderProducts = () => {
    return products;
  };

  return (
    <div className="row mt-3">
      {renderProducts().map((product) => (
        <Product key={product.id} product={product} compare={compare} />
      ))}
    </div>
  );
};

export default ProductList;
