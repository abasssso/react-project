import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import CartContextProvider from "./contexts/cartContext";
import ProductsContextProvider from "./contexts/productsContext";
import Routing from "./Routing";

function App() {
  return (
    <CartContextProvider>
      <ProductsContextProvider>
        <BrowserRouter>
          <Header />
          <Routing></Routing>
        </BrowserRouter>
      </ProductsContextProvider>
    </CartContextProvider>
  );
}

export default App;
