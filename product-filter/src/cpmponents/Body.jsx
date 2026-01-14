import Table from "./Table";
import { useEffect, useState } from "react";
import fetchProducts from "../api/productApi";
import { seedProducts, getProducts } from "../api/mockApi";

const Body = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    brand: "",
    category: "",
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
  const applyFilters = (list, f) => {
    return list.filter((p) => {
      const brandMatch = f.brand ? p.brand === f.brand : true;
      const categoryMatch = f.category ? p.category === f.category : true;
      return brandMatch && categoryMatch;
    });
  };
  const brandList = applyFilters(products, {
    brand: "",
    category: filters.category,
  });
  const brands = [...new Set(brandList.map((p) => p.brand))];
  const categoryList = applyFilters(products, {
    brand: filters.brand,
    category: "",
  });
  const categories = [...new Set(categoryList.map((p) => p.category))];

  const filteredProducts = applyFilters(products, filters);
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
          categories={categories}
        />
      </div>
    </div>
  );
};
export default Body;
