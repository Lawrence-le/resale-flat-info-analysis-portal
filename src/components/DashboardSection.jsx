import { Row, Col } from "react-bootstrap";
import VariantsExample from "./Spinner"; // Ensure VariantsExample is a spinner component

function DashboardSection({ totalRecords, displayMonth, loading }) {
  // Show spinner if loading or if totalRecords is 0
  const showSpinner = loading || totalRecords === 0;

  return (
    <Row className="justify-content-center text-center mb-4">
      <Col>
        <div className="dashboard-section p-3 bg-light border rounded">
          {showSpinner ? (
            <div className="d-flex justify-content-center align-items-center">
              <VariantsExample animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </VariantsExample>
            </div>
          ) : (
            <>
              <p>
                <strong>Total Records:</strong>
              </p>
              <h1
                className="mt-3"
                style={{ color: "#0d6efd", fontWeight: "bold" }}
              >
                {totalRecords}
              </h1>
              <p>
                <strong>Period:</strong> {displayMonth}
              </p>
            </>
          )}
        </div>
      </Col>
    </Row>
  );
}

export default DashboardSection;
