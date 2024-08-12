import PriceCard from "./PriceCard";
import { Row, Col } from "react-bootstrap";

const TownHighLowPrice = ({ lowestPrice, highestPrice, loading }) => {
  return (
    <div>
      {loading ? (
        <p>Loading... Please wait.</p>
      ) : lowestPrice === null && highestPrice === null ? (
        <p>Please set filter</p>
      ) : (
        <Row className="price-cards-container">
          <Col className="d-flex flex-column align-items-left mb-3 mx-2">
            <h5 className="price-subtitle">Lowest Price</h5>
            {lowestPrice ? (
              <PriceCard data={lowestPrice} />
            ) : (
              <div>No lowest price data available.</div>
            )}
          </Col>
          <Col className="d-flex flex-column align-items-left mx-2">
            <h5 className="price-subtitle">Highest Price</h5>
            {highestPrice ? (
              <PriceCard data={highestPrice} />
            ) : (
              <div>No highest price data available.</div>
            )}
          </Col>
        </Row>
      )}
    </div>
  );
};

export default TownHighLowPrice;
