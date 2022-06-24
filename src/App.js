import { BrowserRouter } from "react-router-dom";
import ProductsContextProvider from "./contexts/productsContext";
import Routing from "./Routing";

function App() {
  return (
    <ProductsContextProvider>
      <BrowserRouter>
        <Routing></Routing>
      </BrowserRouter>
    </ProductsContextProvider>
  );
}

export default App;
