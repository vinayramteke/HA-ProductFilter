import Table from "./Table";

const Body = () => {
  const [products, setProducts] = useState([]);

  return (
    <div className="body-container">
      <h2>I'm Body.</h2>
      <div className="table-heading-container">
        <h1>Product Filter Table</h1>
      </div>
      <div className="table-container">
        <Table />
      </div>
    </div>
  );
};
export default Body;
