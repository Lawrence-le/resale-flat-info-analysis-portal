import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "../css/index.css";

import { Link } from "react-router-dom";

function NaviBar() {
  return (
    <Navbar className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <strong> Re.Flat </strong>
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/town">
            <strong>Town</strong>
          </Nav.Link>
          <Nav.Link as={Link} to="/islandWide">
            <strong>Island-wide</strong>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NaviBar;
