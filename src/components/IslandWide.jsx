import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useState } from "react";

const Islandwide = () => {
  const [chart1Selection, setChart1Selection] = useState("");
  const [chart2Selection, setChart2Selection] = useState("");

  const handleChart1SelectionChange = (e) => {
    setChart1Selection(e.target.value);
  };
  const handleChart2SelectionChange = (e) => {
    setChart2Selection(e.target.value);
  };

  const handleSubmitChart1 = (e) => {
    e.preventDefault();

    if (chart1Selection === "11") {
      console.log("Chart 1: Selected 1");
    } else if (chart1Selection === "12") {
      console.log("Chart 1: Selected 2");
    } else if (chart1Selection === "13") {
      console.log("Chart 1: Selected 3");
    } else {
      console.log("No valid selection made");
    }
  };

  const handleSubmitChart2 = (e) => {
    e.preventDefault();

    if (chart2Selection === "21") {
      console.log("Chart 2: Selected 1");
    } else if (chart2Selection === "22") {
      console.log("Chart 2: Selected 2");
    } else if (chart2Selection === "23") {
      console.log("Chart 2: Selected 3");
    } else {
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
                    <option value="11">Select 1</option>
                    <option value="12">Select 2</option>
                    <option value="13">Select 3</option>
                  </Form.Control>
                </Form.Group>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSubmitChart1}
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
                  onClick={handleSubmitChart2}
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
