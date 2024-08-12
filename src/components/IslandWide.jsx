import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useState } from "react";

const Islandwide = () => {
  const [chart1Selection, setChart1Selection] = useState("");
  const [chart2Selection, setChart2Selection] = useState("");

  const handleChart2SelectionChange = (e) => {
    setChart1Selection(e.target.value);
  };
  const handleChart1SelectionChange = (e) => {
    setChart2Selection(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (chart2Selection) {
      case "21":
        // Logic for Chart 2 Resale Price vs Floor Area (sqm)
        console.log("Selected Chart 2: Resale Price vs Floor Area (sqm)");
        break;
      case "22":
        // Logic for Chart 2 Resale Price vs Remaining Lease
        console.log("Selected Chart 2: Resale Price vs Remaining Lease");
        break;
      case "23":
        // Logic for Chart 2 Resale Price vs Storey Range
        console.log("Selected Chart 2: Resale Price vs Storey Range");
        break;
      default:
        console.log("No valid selection made");
    }
  };

  return (
    <>
      <Container className="mb-4 custom-font-size-town">
        <h5 className="mb-3 colorTitle">Islandwide Analysis</h5>
        <Row>
          <h5 className="text1">Chart Selection</h5>
          <div className="border p-3 rounded">
            <Row className="g-2">
              <Col>
                <Form.Group controlId="islandwide-town-select">
                  <Form.Label>Chart 1 Selection</Form.Label>
                  <Form.Control
                    as="select"
                    style={{ fontSize: ".9em" }}
                    value={chart1Selection}
                    onChange={handleChart1SelectionChange}
                  >
                    <option value="" disabled>
                      Please Select Analysis
                    </option>
                    <option value="21">Resale Price vs Floor Area (sqm)</option>
                    <option value="22">Resale Price vs Remaining Lease</option>
                    <option value="23">Resale Price vs Storey Range</option>
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
              </Col>

              <Col>
                <Form.Group controlId="islandwide-flattype-select">
                  <Form.Label>Chart 2 Selection</Form.Label>
                  <Form.Control
                    as="select"
                    style={{ fontSize: ".9em" }}
                    value={chart2Selection}
                    onChange={handleChart2SelectionChange}
                  >
                    <option value="" disabled>
                      Please Select Analysis
                    </option>
                    <option value="21">Resale Price vs Floor Area (sqm)</option>
                    <option value="22">Resale Price vs Remaining Lease</option>
                    <option value="23">Resale Price vs Storey Range</option>
                  </Form.Control>
                </Form.Group>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSubmit}
                  className="mt-2"
                  style={{ fontSize: ".9em" }}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </div>
        </Row>
      </Container>

      <Container>
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
    </>
  );
};

export default Islandwide;
