import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Form, ListGroup } from "react-bootstrap";
import { getHdb, getHdbFilteredTown } from "../services/Api";
import {
  addSelection,
  fetchExistingData,
  deleteAllRecords,
  addFavourites,
  fetchFavouriteTowns,
  deleteAllFavourites,
} from "../services/AirTable";
import { useEffect, useState } from "react";
import TownAgg from "./TownAgg";
import TownHighLowPrice from "./TownHighLowPrice";
import { format } from "date-fns";

const getYear = new Date().getFullYear();

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

  const [favourites, setFavourites] = useState([]);
  const [selectedFavourite, setSelectedFavourite] = useState("");

  //* Get Unique Town Name for Selection
  useEffect(() => {
    const fetchData = async () => {
      const data = await getHdb(getYear);
      // console.log("Total Records for getHDB: ", data.length);

      const uniqueTowns = [...new Set(data.map((record) => record.town))];
      uniqueTowns.sort();
      setTowns(uniqueTowns);

      const uniqueFlatTypes = [
        ...new Set(data.map((record) => record.flat_type)),
      ];
      uniqueFlatTypes.sort();
      setFlatTypes(uniqueFlatTypes);
    };
    fetchData();
  }, []);

  //* AirTable
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchExistingData();
      setTownFilter(data);
    };
    fetchData();
  }, []);

  //* Filter and Output Statistics

  //Town.jsx
  useEffect(() => {
    const fetchAndCalculate = async () => {
      if (townFilter.length > 0) {
        const getTown = townFilter[0].town;
        const getFlatType = townFilter[0].flatType;
        setLoading(true);
        try {
          const records = await getHdbFilteredTown(
            getTown,
            getFlatType,
            getYear
          );

          const months = records.map((record) => record.month);

          const sortedMonths = months.sort((a, b) => new Date(a) - new Date(b));

          const getMinMonth = sortedMonths[0];
          const getMaxMonth = sortedMonths[sortedMonths.length - 1];

          setMinMonth(getMinMonth);
          setMaxMonth(getMaxMonth);

          calculateStatistics(records);
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
      setMaxMonth(null);
      setMinMonth(null);
    } catch (error) {
      console.error(error.message);
    }
  };
  //* For Favourites
  useEffect(() => {
    const loadFavoriteTowns = async () => {
      try {
        const fetchedFavourites = await fetchFavouriteTowns();
        setFavourites(fetchedFavourites);
      } catch (error) {
        console.error("Error fetching favorite towns:", error.message);
      }
    };

    loadFavoriteTowns();
  }, []);

  const handleSubmitFavourites = async (e) => {
    e.preventDefault();
    try {
      const result = await addFavourites();
      if (result) {
        // Fetch updated favourites and set the state
        const updatedFavourites = await fetchFavouriteTowns();
        setFavourites(updatedFavourites);
        alert("Favourite added successfully!");
      }
    } catch (error) {
      console.error("Error adding favourite:", error.message);
    }
  };

  const handleFavouriteChange = async (e) => {
    const selectedValue = e.target.value;
    setSelectedFavourite(selectedValue);

    if (selectedValue) {
      console.log("Selected Favourite:", selectedValue);
    }
  };

  const handleEditFavourites = () => {
    alert("Edit Favourites clicked");
  };

  const handleRemoveAllFavourites = async () => {
    try {
      const result = await deleteAllFavourites();
      if (!result) {
        const updatedFavourites = await fetchFavouriteTowns();
        if (updatedFavourites.length === 0) {
          setFavourites(updatedFavourites);
          alert("All favourites removed successfully!");
        }
      }
    } catch (error) {
      console.error("Error removing all favourites:", error.message);
    }
  };

  return (
    <Container className="mb-4 custom-font-size-town">
      <h5 className="mb-3 colorTitle">
        Town Analysis
        {minMonth
          ? ` (${format(new Date(minMonth + "-01"), "MMM yyyy")} to `
          : ""}
        {maxMonth ? `${format(new Date(maxMonth + "-01"), "MMM yyyy")})` : ""}
      </h5>

      <Row>
        <Col className="mb-4">
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
                  Select a Town
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
                  Select a Flat Type
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
        <Col>
          <h5 className="text1">Selected Filter</h5>
          <div className="border p-3">
            <ListGroup>
              {townFilter.length > 0 ? (
                townFilter.map((item, index) => (
                  <ListGroup.Item key={index} style={{ fontSize: "0.9em" }}>
                    Town: {item.town} / Flat Type: {item.flatType}
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
              className="mt-2 me-2"
              onClick={handleClear}
              style={{ fontSize: ".9em" }}
            >
              Clear Filter
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="mt-2"
              style={{ fontSize: ".9em" }}
              onClick={handleSubmitFavourites}
            >
              Add to Favourites
            </Button>
          </div>
        </Col>

        <Col>
          <h5 className="text1">Favourite Towns</h5>
          <div className="border p-3">
            <Form.Group controlId="flattype-select">
              <Form.Control
                as="select"
                value={selectedFavourite}
                onChange={handleFavouriteChange}
                style={{ fontSize: ".9em" }}
              >
                <option value="" disabled>
                  Select a Favourite
                </option>
                {favourites.map((item, index) => (
                  <option key={index} value={item}>
                    Town: {item.town} / Flat Type: {item.flatType}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button
              variant="primary"
              size="sm"
              type="submit"
              className="mt-2 me-2"
              style={{ fontSize: ".9em" }}
            >
              Submit
            </Button>

            <Button
              variant="primary"
              size="sm"
              className="mt-2"
              style={{ fontSize: ".9em" }}
              onClick={handleEditFavourites}
            >
              Edit
            </Button>

            <Button
              variant="danger"
              size="sm"
              className="mt-2 ms-2"
              style={{ fontSize: ".9em" }}
              onClick={handleRemoveAllFavourites}
            >
              Remove All Favourites
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="d-flex">
        <Col className="d-flex flex-column">
          <h5 className="text1 mt-5 mb-3">Selected Town Analysis</h5>
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
            </Row>
            <Row className="g-2 mt-3">
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
        </Col>

        <Col className="d-flex flex-column">
          <h5 className="text1 mt-5 mb-3">Favourite Town Analysis</h5>
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
            </Row>
            <Row className="g-2 mt-3">
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
        </Col>
      </Row>
    </Container>
  );
}

export default Town;
