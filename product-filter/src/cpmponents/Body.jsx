import Table from "./Table";
import { useEffect, useState } from "react";
import fetchProducts from "../api/productApi";
import { seedProducts, getproducts } from "../api/mockapi";

const Body = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const apiData = await fetchProducts();
    seedProducts(apiData);
    const localData = await getproducts();
    setProducts(localData);
  };
  console.log(products);

  return (
    <div className="body-container">
      <h2>I'm Body.</h2>
      <div className="table-heading-container">
        <h1>Product Filter Table</h1>
      </div>
      <div className="table-container">
        <Table products={products} />
      </div>
    </div>
  );
};
export default Body;
