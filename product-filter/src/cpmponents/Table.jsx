import { useState } from "react";
import { updateTitle, getProducts, deleteProduct } from "../api/mockApi";

const Table = ({
  products,
  setProducts,
  filters,
  setFilters,
  brands,
  categories,
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
    await deleteProduct(id);

    const updatedList = await getProducts();
    setProducts(updatedList);
  };
  return (
    <div className="table-body">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>
              Brand
              <select
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
            <th>
              Category
              <select
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

            <th>Price</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                {" "}
                {editId === p.id ? (
                  <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                ) : (
                  p.title
                )}
              </td>
              <td>{p.brand}</td>
              <td>{p.category}</td>
              <td>{p.price}</td>
              <td>{p.rating}</td>
              <td>
                {editId === p.id ? (
                  <div className="">
                    <button onClick={() => handleSave(p.id)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => handleEdit(p)}>Edit</button>
                    <button onClick={() => handleDelete(p.id)}>Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
