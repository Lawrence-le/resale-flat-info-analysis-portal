import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Form, ListGroup } from "react-bootstrap";
import { getHdb } from "../services/Api";
import {
  addSelection,
  fetchExistingData,
  deleteAllRecords,
} from "../services/AirTable";
import { useEffect, useState } from "react";
import TownAgg from "./TownAgg";
import TownHighLowPrice from "./TownHighLowPrice";

function Town() {
  const [towns, setTowns] = useState([]);
  const [flatTypes, setFlatTypes] = useState([]);
  const [selectedTown, setSelectedTown] = useState("");
  const [selectedFlatType, setSelectedFlatType] = useState("");
  const [townFilter, setTownFilter] = useState([]);
  const [, setNoDataAvailable] = useState(false);

  const [medianPrice, setMedianPrice] = useState(null);
  const [meanPrice, setMeanPrice] = useState(null);
  const [unitCount, setUnitCount] = useState(0);

  const [lowestPrice, setLowestPrice] = useState(null);
  const [highestPrice, setHighestPrice] = useState(null);

  const [maxMonth, setMaxMonth] = useState(null);
  const [minMonth, setMinMonth] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHdb();

      const uniqueTowns = [...new Set(data.map((record) => record.town))];
      uniqueTowns.sort();
      setTowns(uniqueTowns);

      const uniqueFlatTypes = [
        ...new Set(data.map((record) => record.flat_type)),
      ];
      uniqueFlatTypes.sort();
      setFlatTypes(uniqueFlatTypes);

      const months = data.map((record) => record.month);
      const sortedMonths = months.sort((a, b) => new Date(a) - new Date(b));
      if (sortedMonths.length > 0) {
        setMinMonth(sortedMonths[0]);
        setMaxMonth(sortedMonths[sortedMonths.length - 1]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchExistingData();
      setTownFilter(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchAndCalculate = async () => {
      if (townFilter.length > 0) {
        setLoading(true);
        try {
          const data = await getHdb();
          const filteredData = data.filter(
            (item) =>
              item.town === townFilter[0].town &&
              item.flat_type === townFilter[0].flatType
          );
          calculateStatistics(filteredData);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchAndCalculate();
  }, [townFilter]);

  const calculateStatistics = (filteredData) => {
    if (filteredData.length === 0) return;

    const resalePrices = filteredData.map((item) =>
      parseFloat(item.resale_price)
    );

    const count = filteredData.length;
    setUnitCount(count);
    setMedianPrice(calculateMedian(resalePrices));
    setMeanPrice(parseInt(calculateMean(resalePrices)));

    // Calculate high/low prices
    const lowestPrice = Math.min(...resalePrices);
    const highestPrice = Math.max(...resalePrices);

    const lowestPriceRecord = filteredData.find(
      (record) => parseFloat(record.resale_price) === lowestPrice
    );
    const highestPriceRecord = filteredData.find(
      (record) => parseFloat(record.resale_price) === highestPrice
    );

    setLowestPrice(lowestPriceRecord);
    setHighestPrice(highestPriceRecord);
  };

  const calculateMedian = (prices) => {
    if (prices.length === 0) return null;
    prices.sort((a, b) => a - b);
    const mid = Math.floor(prices.length / 2);
    return prices.length % 2 === 0
      ? (prices[mid - 1] + prices[mid]) / 2
      : prices[mid];
  };

  const calculateMean = (prices) => {
    if (prices.length === 0) return null;
    const sum = prices.reduce((acc, price) => acc + price, 0);
    return sum / prices.length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTown || !selectedFlatType) {
      alert("Please select both town and flat type.");
      return;
    }
    try {
      await deleteAllRecords();

      const result = await addSelection(selectedTown, selectedFlatType);
      if (result) {
        const updatedData = await fetchExistingData();
        if (updatedData.length === 0) {
          setNoDataAvailable(true);
        } else {
          setNoDataAvailable(false);
          setTownFilter(updatedData);
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleClear = async () => {
    try {
      await deleteAllRecords();
      setTownFilter([]);
      setSelectedTown("");
      setSelectedFlatType("");
      setMedianPrice(null);
      setMeanPrice(null);
      setUnitCount(0);
      setLowestPrice(null);
      setHighestPrice(null);
      setLoading(false);
      setNoDataAvailable(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container className="mb-4 custom-font-size-town">
      <h5 className="mb-3 colorTitle">
        Town Analysis ({minMonth} to {maxMonth})
      </h5>
      <Row>
        <Col className="mb-4">
          <h5 className="text1">Selected Filter</h5>
          <div className="border p-3">
            <ListGroup>
              {townFilter.length > 0 ? (
                townFilter.map((item, index) => (
                  <ListGroup.Item key={index}>
                    Town: {item.town} - Flat Type: {item.flatType}
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item style={{ color: "red" }}>
                  Set Filter to Begin.
                </ListGroup.Item>
              )}
            </ListGroup>
            <Button
              variant="primary"
              size="sm"
              className="mt-2"
              onClick={handleClear}
              style={{ fontSize: ".9em" }}
            >
              Clear Filter
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <h5 className="text1"> Set Filter</h5>
          <Form className="border p-3 " onSubmit={handleSubmit}>
            <Form.Group controlId="town-select ">
              <Form.Label>Select a Town</Form.Label>
              <Form.Control
                as="select"
                value={selectedTown}
                onChange={(e) => setSelectedTown(e.target.value)}
                style={{ fontSize: ".9em" }}
              >
                <option value="" disabled>
                  Select a town
                </option>
                {towns.map((town, index) => (
                  <option key={index} value={town}>
                    {town}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="flattype-select ">
              <Form.Label className="mt-2 ">Select a Flat Type</Form.Label>
              <Form.Control
                as="select"
                value={selectedFlatType}
                onChange={(e) => setSelectedFlatType(e.target.value)}
                style={{ fontSize: ".9em" }}
              >
                <option value="" disabled>
                  Select a flat type
                </option>
                {flatTypes.map((flatType, index) => (
                  <option key={index} value={flatType}>
                    {flatType}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button
              variant="primary"
              size="sm"
              type="submit"
              className="mt-2"
              style={{ fontSize: ".9em" }}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <h5 className="text1 mt-5 mb-3">Town Analysis</h5>
        <div className="border p-3 rounded">
          <Row className="g-2">
            <Col className="d-flex flex-column gap-2">
              <h5 className="colorTitle">Median, Mean Price</h5>
              <div className="d-flex flex-column flex-fill shadow border-primary p-3 bg-white rounded townAggText">
                <TownAgg
                  townFilter={townFilter}
                  meanPrice={meanPrice}
                  medianPrice={medianPrice}
                  unitCount={unitCount}
                  loading={loading}
                />
              </div>
            </Col>

            <Col className="d-flex flex-column gap-2">
              <h5 className="colorTitle">Lowest vs Highest Price</h5>
              <div className="d-flex flex-column flex-fill shadow border-primary p-3 bg-white rounded townAggText">
                <TownHighLowPrice
                  lowestPrice={lowestPrice}
                  highestPrice={highestPrice}
                  loading={loading}
                />
              </div>
            </Col>
          </Row>
        </div>
      </Row>
    </Container>
  );
}

export default Town;
