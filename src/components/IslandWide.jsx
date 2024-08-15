// Islandwide.jsx
import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import ChartIslandWide from "./ChartIslandWide";

const Islandwide = () => {
  const [chart1Selection, setChart1Selection] = useState("");
  const [chart2Selection, setChart2Selection] = useState("");

  const handleChart1SelectionChange = (e) => {
    setChart1Selection(e.target.value);
  };

  const handleChart2SelectionChange = (e) => {
    setChart2Selection(e.target.value);
  };

  return (
    <>
      <Container className="mb-4 custom-font-size-town">
        <h5 className="mb- colorTitle">Islandwide Analysis</h5>
        <Row>
          <div className="border p-3 rounded">
            <Row className="g-2">
              <Col>
                <Form.Group controlId="islandwide-town-select">
                  <Form.Label className="text1">Chart 1</Form.Label>
                  <Form.Control
                    as="select"
                    style={{ fontSize: ".9em" }}
                    value={chart1Selection}
                    onChange={handleChart1SelectionChange}
                  >
                    <option value="" disabled>
                      Please Select Analysis
                    </option>
                    <option value="11">Total Units Transacted</option>
                    {/* Add other options as needed */}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Row className="g-2">
                <Col className="d-flex flex-column gap-2">
                  <div className="d-flex flex-column flex-fill shadow border-primary p-3 bg-white rounded">
                    {chart1Selection ? (
                      <ChartIslandWide chart1Selection={chart1Selection} />
                    ) : (
                      <p>Please select an analysis option.</p>
                    )}
                  </div>
                </Col>
              </Row>

              <Col>
                <Form.Group controlId="islandwide-flattype-select">
                  <Form.Label className="text1 mt-5">Chart 2</Form.Label>
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
                    {/* Added missing option */}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Row className="text1 g-2 mt-2">
                <Col className="d-flex flex-column gap-2">
                  <div className="d-flex flex-column flex-fill shadow border-primary p-3 bg-white rounded">
                    {chart2Selection ? (
                      <ChartIslandWide chart2Selection={chart2Selection} />
                    ) : (
                      <p>Please select an analysis option.</p>
                    )}
                  </div>
                </Col>
              </Row>
            </Row>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Islandwide;
