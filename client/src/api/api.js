import axios from "axios";

export const fetchProducts = async () => {
  const res = await axios.get("http://localhost:5000/api/products");
  console.log(res.data);
};
