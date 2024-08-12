import { useEffect, useState } from "react";
import { getHdb } from "../services/Api";
import { Container, Row, Col } from "react-bootstrap";
import VariantsExample from "./Spinner"; // Import your spinner component

function HighestPriceMonth() {
  const [highestTransaction, setHighestTransaction] = useState(null);
  const [displayMonth, setDisplayMonth] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHdb();
        const previousMonth = getPreviousMonth();
        const formattedMonth = new Date(`${previousMonth}-01`).toLocaleString(
          "default",
          {
            month: "long",
            year: "numeric",
          }
        );
        setDisplayMonth(formattedMonth);

        processHighestTransaction(data, previousMonth);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false); // Set loading to false after data fetching is complete
      }
    };

    fetchData();
  }, []);

  const getPreviousMonth = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  };

  const processHighestTransaction = (data) => {
    const previousMonth = getPreviousMonth();

    // Set the month name and year for display
    setDisplayMonth(
      new Date(`${previousMonth}-01`).toLocaleString("default", {
        month: "long",
        year: "numeric",
      })
    );

    const filteredData = data.filter(
      (record) => record.month === previousMonth
    );

    const highest = filteredData.reduce((price1, price2) =>
      parseFloat(price1.resale_price) > parseFloat(price2.resale_price)
        ? price1
        : price2
    );

    setHighestTransaction(highest);
  };
  if (loading) {
    return <VariantsExample />; // Replace loading text with the spinner
  }
  return (
    <Container>
      <Row className="justify-content-center text-center mb-2">
        <Col>
          <p className="hpCompTitle">Previous Month's Highest Resale Price</p>
          <p className="text1">{displayMonth}</p>
          <h2 className="mt-3" style={{ color: "#0d6efd", fontWeight: "bold" }}>
            ${parseFloat(highestTransaction.resale_price).toLocaleString()}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <div>
            <h5 style={{ color: "#0d6efd" }}>
              <strong>{highestTransaction.town}</strong>
            </h5>
          </div>
        </Col>
        <Col>
          <div>
            <p>
              <strong>Flat Type:</strong> {highestTransaction.flat_type}
            </p>
            <p>
              <strong>Block:</strong> {highestTransaction.block}
            </p>
            <p>
              <strong>Street Name:</strong> {highestTransaction.street_name}
            </p>
            <p>
              <strong>Storey Range:</strong> {highestTransaction.storey_range}
            </p>
            <p>
              <strong>Floor Area (sqm):</strong>{" "}
              {highestTransaction.floor_area_sqm}
            </p>
            <p>
              <strong>Flat Model:</strong> {highestTransaction.flat_model}
            </p>
            <p>
              <strong>Lease Commence Date:</strong>{" "}
              {highestTransaction.lease_commence_date}
            </p>
            <p>
              <strong>Remaining Lease:</strong>{" "}
              {highestTransaction.remaining_lease}
            </p>
            {/* <p>
              <strong>Resale Price:</strong> ${highestTransaction.resale_price}
            </p> */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HighestPriceMonth;
