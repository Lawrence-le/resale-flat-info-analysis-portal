import { Container, Row, Col, ListGroup, Button, Form } from "react-bootstrap";

const Islandwide = () => {
  return (
    <Container className="mb-4 custom-font-size-town">
      <h5 className="mb-3 colorTitle">Islandwide Analysis</h5>

      <Row>
        <Col className="mb-4">
          <h5 className="text1">Chart Selection</h5>
          <div className="border p-3">
            <ListGroup>
              <ListGroup.Item style={{ color: "red" }}>
                Set Filter to Begin.
              </ListGroup.Item>
            </ListGroup>
            <Button
              variant="primary"
              size="sm"
              className="mt-2"
              style={{ fontSize: ".9em" }}
            >
              Clear Filter
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <h5 className="text1">Chart Selection</h5>
          <Form className="border p-3">
            <Form.Group controlId="islandwide-town-select">
              <Form.Label>Chart Selection</Form.Label>
              <Form.Control as="select" style={{ fontSize: ".9em" }}>
                <option value="" disabled>
                  Chart Selection
                </option>
                <option value="example-town">Chart Selection</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="islandwide-flattype-select">
              <Form.Label className="mt-2">Chart Selection</Form.Label>
              <Form.Control as="select" style={{ fontSize: ".9em" }}>
                <option value="" disabled>
                  Chart Selection
                </option>
                <option value="example-flat-type">Chart Selection</option>
              </Form.Control>
            </Form.Group>

            <Button
              variant="primary"
              size="sm"
              type="submit"
              className="mt-2"
              style={{ fontSize: ".9em" }}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <h5 className="text1 mt-5 mb-3">Islandwide Analysis</h5>
        <div className="border p-3 rounded">
          <Row className="g-2">
            <Col className="d-flex flex-column gap-2">
              <h5 className="colorTitle">Chart 1</h5>
              <div className="d-flex flex-column flex-fill shadow border-primary p-3 bg-white rounded townAggText">
                Chart 1
              </div>
            </Col>

            <Col className="d-flex flex-column gap-2">
              <h5 className="colorTitle">Chart 2</h5>
              <div className="d-flex flex-column flex-fill shadow border-primary p-3 bg-white rounded townAggText">
                Chart 2
              </div>
            </Col>
          </Row>
        </div>
      </Row>
    </Container>
  );
};

export default Islandwide;
