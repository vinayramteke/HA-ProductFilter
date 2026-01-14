import Table from "./Table";
import { useEffect, useState } from "react";
import fetchProducts from "../api/productApi";
import { seedProducts, getProducts } from "../api/mockApi";

const Body = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    brand: "",
    category: "",
    price: "",
    rating: "",
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
      const titleMatch = f.title ? p.title === f.title : true;
      const brandMatch = f.brand ? p.brand === f.brand : true;
      const categoryMatch = f.category ? p.category === f.category : true;
      const priceMatch = f.price ? p.price === f.price : true;
      const ratingMatch = f.rating ? p.rating === f.rating : true;
      return (
        titleMatch && brandMatch && categoryMatch && priceMatch && ratingMatch
      );
    });
  };
  const titleList = applyFilters(products, { ...filters, title: "" });
  const titles = [...new Set(titleList.map((p) => p.title))].sort();

  const brandList = applyFilters(products, { ...filters, brand: "" });
  const brands = [...new Set(brandList.map((p) => p.brand))].sort();

  const categoryList = applyFilters(products, { ...filters, category: "" });
  const categories = [...new Set(categoryList.map((p) => p.category))].sort();

  const priceList = applyFilters(products, { ...filters, price: "" });
  const prices = [...new Set(priceList.map((p) => p.price))].sort(
    (a, b) => a - b
  );

  const ratingList = applyFilters(products, { ...filters, rating: "" });
  const ratings = [...new Set(ratingList.map((p) => p.rating))].sort(
    (a, b) => a - b
  );

  const filteredProducts = applyFilters(products, filters);
  return (
    <div className="p-4">
      <div className="flex item-centre justify-between mb-4">
        <h1>Product Filter Table</h1>
      </div>
      <div className="px-4 py-2 text-sm rounded-md bg-gray-800 text-white hover:bg-gray-700">
        <button
          onClick={() => {
            setFilters({
              title: "",
              brand: "",
              category: "",
              price: "",
              rating: "",
            });
          }}
        >
          Reset
        </button>
      </div>
      <div className="rounded-md border border-gray-200 bg-white p-3">
        <Table
          products={filteredProducts}
          setProducts={setProducts}
          filters={filters}
          setFilters={setFilters}
          titles={titles}
          brands={brands}
          categories={categories}
          prices={prices}
          ratings={ratings}
        />
      </div>
    </div>
  );
};
export default Body;
