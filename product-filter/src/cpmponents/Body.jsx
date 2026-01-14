import Table from "./Table";
import { useEffect, useState } from "react";
import fetchProducts from "../api/productApi";
import { seedProducts, getProducts } from "../api/mockApi";

const Body = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const apiData = await fetchProducts();
    seedProducts(apiData);
    const localData = await getProducts();
    setProducts(localData);
  };
  console.log(products);

  return (
    <div className="body-container">
      <div className="table-heading-container">
        <h1>Product Filter Table</h1>
      </div>
      <div className="table-container">
        <Table products={products} setProducts={setProducts} />
      </div>
    </div>
  );
};
export default Body;
