import { Row, Col } from "react-bootstrap";

function DashboardSection({ totalRecords, displayMonth, loading }) {
  const nowLoading = loading || totalRecords === 0;

  return (
    <Row className="justify-content-center text-center mb-4">
      <Col>
        <div className="p-3 transparent-bg rounded">
          {nowLoading ? (
            <div className="d-flex justify-content-center align-items-center">
              <h6 style={{ color: "white" }}>Loading...</h6>
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
