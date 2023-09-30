import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { Details } from "./pages/Details";
import { Navbar } from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

function App() {
  return (
    <ShoppingCartProvider>
      <Container className="mb-4">
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/details/:wine" element={<Details />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;
