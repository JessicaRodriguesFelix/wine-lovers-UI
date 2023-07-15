import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart();
  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>
        </Nav>
        {cartQuantity > 0 && (
          <div>
            <Button
              onClick={openCart}
              style={{ position: "relative" }}
              variant="outline-primary"
            >
              <svg
                width="29px"
                height="29px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="16.5" cy="18.5" r="1.5" />
                <circle cx="9.5" cy="18.5" r="1.5" />
                <path d="M18 16H8a1 1 0 0 1-.958-.713L4.256 6H3a1 1 0 0 1 0-2h2a1 1 0 0 1 .958.713L6.344 6H21a1 1 0 0 1 .937 1.352l-3 8A1 1 0 0 1 18 16zm-9.256-2h8.563l2.25-6H6.944z" />
              </svg>
              {/* div below is an indicator for the shopping cart button to display the number of items */}
              <div
                className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                style={{
                  color: "white",
                  width: "1.5rem",
                  height: "1.5rem",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  transform: "translate(25%, 25%)",
                }}
              >
                {cartQuantity}
              </div>
            </Button>
          </div>
        )}
      </Container>
    </NavbarBs>
  );
}
