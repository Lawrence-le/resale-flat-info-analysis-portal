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
          ReFLAT
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/Town">
            Town
          </Nav.Link>
          <Nav.Link as={Link} to="/IslandWide">
            Island-wide
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NaviBar;
