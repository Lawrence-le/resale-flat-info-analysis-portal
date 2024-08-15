import { Row, Col } from "react-bootstrap";
import VariantsExample from "./Spinner"; // Ensure VariantsExample is a spinner component

function DashboardSection({ totalRecords, displayMonth, loading }) {
  // Show spinner if loading or if totalRecords is 0
  const showSpinner = loading || totalRecords === 0;

  return (
    <Row className="justify-content-center text-center mb-4">
      <Col>
        <div className="p-3 transparent-bg rounded">
          {showSpinner ? (
            <div className="d-flex justify-content-center align-items-center">
              <VariantsExample animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </VariantsExample>
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex flex-column align-items-center mb-1">
                <h6
                  className="mb-0"
                  style={{ fontWeight: "200", color: "white" }}
                >
                  Total No. of Transactions Last Month
                </h6>
                <h6
                  className="mb-3"
                  style={{ fontWeight: "200", color: "white" }}
                >
                  {displayMonth}
                </h6>
                <h1 className="mb-1" style={{ color: "white" }}>
                  <strong>{totalRecords}</strong>
                </h1>
              </div>
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
}

export default DashboardSection;
