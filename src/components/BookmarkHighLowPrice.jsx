import PriceCard from "./PriceCard";
import { Row, Col } from "react-bootstrap";

const BookmarkHighLowPrice = ({
  lowestPriceBookmark,
  highestPriceBookmark,
  loading,
  selectedBookmarkTown,
  selectedBookmarkFlatType,
}) => {
  return (
    <div>
      {loading ? (
        <p>Loading... Please wait.</p>
      ) : !selectedBookmarkTown || !selectedBookmarkFlatType ? (
        <p>Please select a bookmark.</p>
      ) : (
        <Row className="price-cards-container">
          <Col className="d-flex flex-column align-items-left mb-3 mx-2">
            <h5 className="price-subtitle">Lowest Price</h5>
            {lowestPriceBookmark ? (
              <PriceCard data={lowestPriceBookmark} />
            ) : (
              <div>No lowest price data available.</div>
            )}
          </Col>
          <Col className="d-flex flex-column align-items-left mx-2">
            <h5 className="price-subtitle">Highest Price</h5>
            {highestPriceBookmark ? (
              <PriceCard data={highestPriceBookmark} />
            ) : (
              <div>No highest price data available.</div>
            )}
          </Col>
        </Row>
      )}
    </div>
  );
};

export default BookmarkHighLowPrice;
