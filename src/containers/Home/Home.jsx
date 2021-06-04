import React, { useState } from "react";
import { CompareTable, ProductList } from "../../components";
import results from "../../data/products.json";

const Home = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState(results.products);

  const compareProducts = products.filter(
    (product) => product.compare
  );

  const handleChange = (event) => {
    setSearch(event.target.value);
    setProducts(results.products.filter((product) => {
      const regex = new RegExp(event.target.value, "gi");
      const itsPrice = Number((/(\d+.\d+)/gm).exec(product.price)[1]);
      const matches = (/([\d.]+)/).exec(String(event.target.value));
      let inputPrice = 0.0;
      if (matches && matches[1]) {
        inputPrice = Number(matches[1]);
      }
      return regex.test(product.name) || itsPrice < inputPrice;
    }));
  };

  const compare = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, compare: !product.compare }
          : product
      ));
  }

  return (
    <div className="home mt-5">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-3">Compare Products</h2>
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <ProductList
        products={products}
        search={search}
        compare={compare}
      />
      {compareProducts.length >= 1 && (
        <CompareTable products={compareProducts} />
      )}
    </div>
  );
}

export default Home;
