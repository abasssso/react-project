import React, { useReducer } from "react";
import axios from "axios";

export const productsContext = React.createContext();

const INIT_STATE = {
  products: [],
  oneProduct: null,
  pages: 0,
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload.data,
        pages: Math.ceil(action.payload.headers["x-total-count"] / 3),
      };
    case "GET_ONE":
      return { ...state, oneProduct: action.payload };
    default:
      return state;
  }
}

const PRODUCTS_API = "http://localhost:8002/products";
const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  // console.log(state);
  // !CRUD
  // !Create
  async function createProduct(newProduct) {
    await axios.post(`${PRODUCTS_API}`, newProduct);
    getProducts();
  }
  // ! READ
  async function getProducts() {
    let res = await axios(`${PRODUCTS_API}${window.location.search}`);
    dispatch({
      type: "GET_PRODUCTS",
      payload: res,
    });
  }
  // !DELETE
  async function deleteProduct(id) {
    await axios.delete(`${PRODUCTS_API}/${id}`);
    getProducts();
  }
  // !Details, get for edit
  async function detailedProduct(id) {
    const res = await axios(`${PRODUCTS_API}/${id}`);
    setTimeout(() => {
      dispatch({
        type: "GET_ONE",
        payload: res.data,
      });
    }, 1000);
  }
  // !Update
  async function updateProduct(id, editedProduct) {
    await axios.patch(`${PRODUCTS_API}/${id}`, editedProduct);
  }
  return (
    <productsContext.Provider
      value={{
        products: state.products,
        oneProduct: state.oneProduct,
        pages: state.pages,
        createProduct,
        getProducts,
        deleteProduct,
        detailedProduct,
        updateProduct,
      }}>
      {children}
    </productsContext.Provider>
  );
};
export default ProductsContextProvider;
