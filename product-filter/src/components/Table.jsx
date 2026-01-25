import { useState } from "react";
import { updateTitle, getProducts, deleteProduct } from "../api/mockApi";

const Table = ({
  products,
  setProducts,
  filters,
  setFilters,
  titles,
  brands,
  categories,
  prices,
  ratings,
}) => {
  const [editId, setEditId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const handleEdit = (p) => {
    setEditId(p.id);
    setNewTitle(p.title);
  };
  const handleSave = async (id) => {
    await updateTitle(id, newTitle);
    const updatedList = await getProducts();
    setProducts(updatedList);

    setEditId(null);
    setNewTitle("");
  };

  const handleCancel = () => {
    setEditId(null);
    setNewTitle("");
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this product?");

    if (!ok) return;
    await deleteProduct(id);

    const updatedList = await getProducts();
    setProducts(updatedList);
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full border boder-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-3 py-2 border border-gray-200">
              Title
              <select
                className="mt-1 w-full border border-gray-300 rounded-md px-2 py-1 g-white"
                value={filters.title}
                onChange={(e) =>
                  setFilters({ ...filters, title: e.target.value })
                }
              >
                <option value="">All</option>
                {titles.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </th>
            <th className="text-left px-3 py-2 border border-gray-200">
              Brand
              <select
                className="mt-1 w-full border border-gray-300 rounded-md px-2 py-1 bg-white"
                value={filters.brand}
                onChange={(e) =>
                  setFilters({ ...filters, brand: e.target.value })
                }
              >
                <option value="">All</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </th>
            <th className="text-left px-3 py-2 border border-gray-200">
              Category
              <select
                className="mt-1 w-full border border-gray-300 rounded-md px-2 py-1 bg-white"
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
              >
                <option value="">All</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </th>

            <th className="text-left px-3 py-2 border border-gray-200">
              Price
              <select
                className="mt-1 w-full border border-gray-300 rounded-md px-2 py-1 bg-white"
                value={filters.price}
                onChange={(e) =>
                  setFilters({ ...filters, price: e.target.value })
                }
              >
                <option value="">All</option>
                {prices.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </th>
            <th className="text-left px-3 py-2 border border-gray-200">
              Rating
              <select
                className="mt-1 w-full border border-gray-300 rounded-md px-2 py-1 bg-white"
                value={filters.rating}
                onChange={(e) =>
                  setFilters({ ...filters, rating: e.target.value })
                }
              >
                <option value="">All</option>
                {ratings.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </th>
            <th className="text-left px-3 py-2 border border-gray-200">
              Actions
            </th>
          </tr>
        </thead>
        {products.length === 0 ? (
          <tbody>
            <tr>
              <td
                colSpan="6"
                className="text-center py-10 text-xl text-gray-500 border border-gray-200"
              >
                No Product found
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-3 py-2 border border-gray-200">
                  {" "}
                  {editId === p.id ? (
                    <input
                      className="w-full border border-gray-300 rounded-md px-2 py-1"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                  ) : (
                    p.title
                  )}
                </td>
                <td className="px-3 py-2 border border-gray-200">
                  {p.brand ? p.brand : <div>Generic</div>}
                </td>
                <td className="px-3 py-2 border border-gray-200">
                  {p.category}
                </td>
                <td className="px-3 py-2 border border-gray-200">${p.price}</td>
                <td className="px-3 py-2 border border-gray-200">
                  ⭐{p.rating}/5
                </td>

                <td className="px-3 py-2 border border-gray-200">
                  {editId === p.id ? (
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-500"
                        onClick={() => handleSave(p.id)}
                      >
                        Save
                      </button>
                      <button
                        className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-500"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-500"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        )}
        {/* <tbody>
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="px-3 py-2 border border-gray-200">
                {" "}
                {editId === p.id ? (
                  <input
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                ) : (
                  p.title
                )}
              </td>
              <td className="px-3 py-2 border border-gray-200">
                {p.brand ? p.brand : <div>Generic</div>}
              </td>
              <td className="px-3 py-2 border border-gray-200">{p.category}</td>
              <td className="px-3 py-2 border border-gray-200">${p.price}</td>
              <td className="px-3 py-2 border border-gray-200">
                ⭐{p.rating}/5
              </td>

              <td className="px-3 py-2 border border-gray-200">
                {editId === p.id ? (
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-500"
                      onClick={() => handleSave(p.id)}
                    >
                      Save
                    </button>
                    <button
                      className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-500"
                      onClick={() => handleEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-500"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody> */}
      </table>
    </div>
  );
};
export default Table;
