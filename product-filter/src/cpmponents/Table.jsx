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
            <th>Prince</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{products[0].title}</td>
            <td>{products[0].brand}</td>
            <td>{products[0].category}</td>
            <td>{products[0].price}</td>
            <td>{products[0].rating}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Table;
