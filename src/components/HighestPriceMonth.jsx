// HighestPriceMonth.jsx

import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

function HighestPriceMonth({ data, loading, formattedMonth }) {
  const [highestTransaction, setHighestTransaction] = useState(null);

  useEffect(() => {
    const processHighestTransaction = (data) => {
      const highest = data.reduce((price1, price2) =>
        parseFloat(price1.resale_price) > parseFloat(price2.resale_price)
          ? price1
          : price2
      );

      setHighestTransaction(highest);
    };

    if (data.length) {
      processHighestTransaction(data);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row className="justify-content-center text-center mb-2">
        <Col>
          <p className="hpCompTitle">Highest Resale Price ({formattedMonth})</p>
          {highestTransaction && (
            <>
              <h2
                className="mt-3"
                style={{ color: "#8e44ad", fontWeight: "bold" }}
              >
                ${parseFloat(highestTransaction.resale_price).toLocaleString()}
              </h2>
              <Row className="mt-4">
                <Col className="d-flex justify-content-center align-items-center">
                  <div>
                    <h5 style={{ color: "#8e44ad" }}>
                      <strong>{highestTransaction.town}</strong>
                    </h5>
                  </div>
                </Col>
                <Col>
                  <div className="text-start">
                    <p>
                      <strong>Flat Type:</strong> {highestTransaction.flat_type}
                    </p>
                    <p>
                      <strong>Block:</strong> {highestTransaction.block}
                    </p>
                    <p>
                      <strong>Street Name:</strong>{" "}
                      {highestTransaction.street_name}
                    </p>
                    <p>
                      <strong>Storey Range:</strong>{" "}
                      {highestTransaction.storey_range}
                    </p>
                    <p>
                      <strong>Floor Area (sqm):</strong>{" "}
                      {highestTransaction.floor_area_sqm}
                    </p>
                    <p>
                      <strong>Flat Model:</strong>{" "}
                      {highestTransaction.flat_model}
                    </p>
                    <p>
                      <strong>Lease Commence Date:</strong>{" "}
                      {highestTransaction.lease_commence_date}
                    </p>
                    <p>
                      <strong>Remaining Lease:</strong>{" "}
                      {highestTransaction.remaining_lease}
                    </p>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
export default HighestPriceMonth;
