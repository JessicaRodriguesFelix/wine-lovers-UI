import { Routes, Route, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { Details } from "./pages/Details";
import { Navbar } from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { useEffect, useState } from "react";

function App() {
  console.log("Rendering App component");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log("Response status:", response.status);
          return response.json();
        })
        .then((responseObject) => {
          console.log("Response object:", responseObject);
          if (responseObject) {
            setUser(responseObject.user);
            console.log("User data:", responseObject.user);
          } else {
            navigate("/login");
          }
        })

        .catch((error) => {
          console.error("Error check:", error);
        });
    };
    getUser();
  }, [navigate]);
  return (
    <ShoppingCartProvider>
      <Container className="mb-4">
        <Navbar user={user} />
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
