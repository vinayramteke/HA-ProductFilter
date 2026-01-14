import { useState } from "react";
import { updateTitle, getProducts } from "../api/mockApi";

const Table = ({ products }) => {
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
  return (
    <div className="table-body">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
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
                  <div>
                    <button onClick={() => handleSave(p.id)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => handleEdit(p)}>Edit</button>
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
