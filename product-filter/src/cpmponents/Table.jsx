import fetchProducts from "../api/productApi";

const Table = ({ product }) => {
  console.log(product);
  return (
    <div className="table-body">
      <table>
        <thead>
          <tr>
            <th>{product.title}</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Prince</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <td>Motor</td>
          <td>mkm</td>
          <td>bus</td>
          <td>$6789</td>
          <td>4.5/5</td>
        </tbody>
      </table>
    </div>
  );
};
export default Table;
