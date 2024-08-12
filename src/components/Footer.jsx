import "../css/index.css";

import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center mt-3 ">
            <p style={{ margin: 0 }}>© 2024 Re.Flat All Rights Reserved.</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <p className="mt-2">
              All HDB data are property of{" "}
              <a
                href="https://beta.data.gov.sg/collections/189/datasets/d_8b84c4ee58e3cfc0ece0d773c8ca6abc/view"
                target="_blank"
                rel="noopener noreferrer"
                className="no-decoration"
              >
                https://beta.data.gov.sg/
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
