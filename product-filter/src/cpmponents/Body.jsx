import Table from "./Table";
import { useEffect, useState } from "react";
import fetchProducts from "../api/productApi";
import { seedProducts, getProducts } from "../api/mockApi";

const Body = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    brand: "",
  });
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const apiData = await fetchProducts();
    seedProducts(apiData);
    const localData = await getProducts();
    setProducts(localData);
  };

  const brands = [...new Set(products.map((p) => p.brand))];
  const filteredProducts = products.filter((p) => {
    const brandMatch = filters.brand ? p.brand === filters.brand : true;
    return brandMatch;
  });

  return (
    <div className="body-container">
      <div className="table-heading-container">
        <h1>Product Filter Table</h1>
      </div>
      <div className="table-container">
        <Table
          products={filteredProducts}
          setProducts={setProducts}
          filters={filters}
          setFilters={setFilters}
          brands={brands}
        />
      </div>
    </div>
  );
};
export default Body;
