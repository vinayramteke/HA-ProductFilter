import fetchProducts from "../api/productApi";

const Table = ({ products }) => {
  //   console.log(products.title);
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
              <td>{p.title}</td>
              <td>{p.brand}</td>
              <td>{p.category}</td>
              <td>{p.price}</td>
              <td>{p.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
