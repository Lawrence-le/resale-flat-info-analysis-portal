import PriceCard from "./PriceCard";
import { Row, Col } from "react-bootstrap";

const TownHighLowPrice = ({
  lowestPrice,
  highestPrice,
  loading,
  townFilter,
}) => {
  // console.log("Value of Lowest Price: ", lowestPrice);
  // console.log("Value of townFilter: ", townFilter.length);
  return (
    <div>
      {loading ? (
        <p>Loading... Please wait.</p>
      ) : townFilter.length > 0 ? (
        <Row className="price-cards-container">
          <Col className="d-flex flex-column align-items-left mb-3 mx-2">
            <h5 className="price-subtitle">Lowest Price</h5>
            <PriceCard data={lowestPrice} />
          </Col>
          <Col className="d-flex flex-column align-items-left mx-2">
            <h5 className="price-subtitle">Highest Price</h5>
            <PriceCard data={highestPrice} />
          </Col>
        </Row>
      ) : (
        <p>Please set filter</p>
      )}
    </div>
  );
};

export default TownHighLowPrice;
