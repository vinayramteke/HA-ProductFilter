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
      const brandMatch = f.brand
        ? (p.brand ? p.brand : "Generic") === f.brand
        : true;
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
  const brands = [
    ...new Set(brandList.map((p) => (p.brand ? p.brand : "Generic"))),
  ].sort();

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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Product Filter Table
        </h1>

        <button
          className="px-5 py-2.5 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 transition-all duration-200 shadow-sm"
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
