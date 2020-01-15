import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "https://my-json-server.typicode.com/bzapata95/CRUDRedux"
});

export default clienteAxios;
