import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Form, ListGroup } from "react-bootstrap";
import { getHdb, getHdbFilteredTown } from "../services/Api";
import {
  addSelection,
  fetchExistingData,
  deleteAllRecords,
  addBookmarks,
  fetchBookmarkedTowns,
  deleteAllBookmarks,
  deleteBookmark,
} from "../services/AirTable";
import { useEffect, useState } from "react";
import TownAgg from "./TownAgg";
import TownHighLowPrice from "./TownHighLowPrice";
import { format } from "date-fns";
import BookmarkAgg from "./BookmarkAgg";
import BookmarkHighLowPrice from "./BookmarkHighLowPrice";

const getYear = new Date().getFullYear();

function Town() {
  const [towns, setTowns] = useState([]);
  const [flatTypes, setFlatTypes] = useState([]);
  const [selectedTown, setSelectedTown] = useState("");
  const [selectedFlatType, setSelectedFlatType] = useState("");
  const [townFilter, setTownFilter] = useState([]);
  const [, setNoDataAvailable] = useState(false);

  const [medianPrice, setMedianPrice] = useState(0);
  const [meanPrice, setMeanPrice] = useState(0);
  const [unitCount, setUnitCount] = useState(0);

  const [lowestPrice, setLowestPrice] = useState(0);
  const [highestPrice, setHighestPrice] = useState(0);

  const [maxMonth, setMaxMonth] = useState("");
  const [minMonth, setMinMonth] = useState("");

  const [loading, setLoading] = useState(false);

  const [unitCountBookmark, setUnitCountBookmark] = useState(0);
  const [medianPriceBookmark, setMedianPriceBookmark] = useState(0);
  const [meanPriceBookmark, setMeanPriceBookmark] = useState(0);
  const [lowestPriceBookmark, setLowestPriceBookmark] = useState(0);
  const [highestPriceBookmark, setHighestPriceBookmark] = useState(0);

  const [bookmarks, setBookmarks] = useState([]);
  const [selectedBookmarkId, setSelectedBookmarkId] = useState("");
  const [selectedBookmarkTown, setSelectedBookmarkTown] = useState("");
  const [selectedBookmarkFlatType, setSelectedBookmarkFlatType] = useState("");

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
  //* https://blog.stackademic.com/finding-the-median-of-an-array-in-javascript-82ff31b3f544
  const calculateMedian = (prices) => {
    if (prices.length === 0) return;
    prices.sort((a, b) => a - b);
    const mid = Math.floor(prices.length / 2);
    return prices.length % 2 === 0
      ? (prices[mid - 1] + prices[mid]) / 2
      : prices[mid];
  };
  //* https://www.explainthis.io/en/swe/find-average-in-an-array
  const calculateMean = (prices) => {
    if (prices.length === 0) return;
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
  //! For Bookmarks

  useEffect(() => {
    const loadFavoriteTowns = async () => {
      try {
        const fetchedBookmarks = await fetchBookmarkedTowns();
        // console.log("Fetched Bookmarks:", fetchedBookmarks);
        setBookmarks(fetchedBookmarks); //? Set Bookmarks with data fetched.
      } catch (error) {
        console.error(error.message);
      }
    };

    loadFavoriteTowns();
  }, []);

  useEffect(() => {
    const fetchAndCalculateBookmark = async () => {
      if (selectedBookmarkTown && selectedBookmarkFlatType) {
        setLoading(true);
        try {
          const records = await getHdbFilteredTown(
            selectedBookmarkTown,
            selectedBookmarkFlatType,
            getYear
          );

          const months = records.map((record) => record.month);
          const sortedMonths = months.sort((a, b) => new Date(a) - new Date(b));

          const getMinMonth = sortedMonths[0];
          const getMaxMonth = sortedMonths[sortedMonths.length - 1];

          setMinMonth(getMinMonth);
          setMaxMonth(getMaxMonth);

          calculateBookmarkStatistics(records);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchAndCalculateBookmark();
  }, [selectedBookmarkTown, selectedBookmarkFlatType]);

  const calculateBookmarkStatistics = (filteredData) => {
    if (filteredData.length === 0) return;

    const resalePrices = filteredData.map((item) =>
      parseFloat(item.resale_price)
    );

    const count = filteredData.length;
    setUnitCountBookmark(count);
    setMedianPriceBookmark(calculateMedian(resalePrices));
    setMeanPriceBookmark(parseInt(calculateMean(resalePrices)));

    const lowestPrice = Math.min(...resalePrices);
    const highestPrice = Math.max(...resalePrices);

    const lowestPriceRecord = filteredData.find(
      (record) => parseFloat(record.resale_price) === lowestPrice
    );
    const highestPriceRecord = filteredData.find(
      (record) => parseFloat(record.resale_price) === highestPrice
    );

    setLowestPriceBookmark(lowestPriceRecord);
    setHighestPriceBookmark(highestPriceRecord);
  };

  const handleAddBookmarks = async (e) => {
    e.preventDefault();
    try {
      const existingBookmarks = await fetchBookmarkedTowns();

      const isBookmark = existingBookmarks.find(
        (fav) =>
          fav.town === townFilter[0]?.town &&
          fav.flatType === townFilter[0]?.flatType
      );

      if (isBookmark) {
        alert("This town and flat type is already in your Bookmarks.");
        return;
      }
      const result = await addBookmarks();
      if (result) {
        const updatedBookmarks = await fetchBookmarkedTowns();
        setBookmarks(updatedBookmarks);
        alert("Bookmark added successfully!");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // const handleAddBookmarks = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const existingBookmarks = await fetchBookmarkedTowns();

  //     const isBookmark = existingBookmarks.find(
  //       (fav) =>
  //         fav.town === townFilter[0]?.town &&
  //         fav.flatType === townFilter[0]?.flatType
  //     );

  //     if (isBookmark) {
  //       alert("This town and flat type is already in your Bookmarks.");
  //       return;
  //     }

  //     const result = await addBookmarks();
  //     if (result) {
  //       const updatedBookmarks = await fetchBookmarkedTowns();

  //       const sortedBookmarks = updatedBookmarks.sort((a, b) => {
  //         return b.town.localeCompare(a.town); // Assuming IDs are strings
  //       });

  //       setBookmarks(sortedBookmarks);

  //       alert("Bookmark added successfully!");
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const handleBookmarkSubmit = (e) => {
    e.preventDefault();

    // console.log("Form Submitted");
    // console.log("Selected Bookmark ID:", selectedBookmarkId);
    // console.log("Selected Town:", selectedBookmarkTown);
    // console.log("Selected Flat Type:", selectedBookmarkFlatType);

    if (!selectedBookmarkTown || !selectedBookmarkFlatType) {
      alert("Please select a valid bookmark.");
      return;
    }

    alert(
      `Selected Bookmark:\nTown: ${selectedBookmarkTown}\nFlat Type: ${selectedBookmarkFlatType}`
    );
  };

  const handleBookmarkChange = (e) => {
    e.preventDefault();
    const selectedId = e.target.value; // Get the selected bookmark ID
    setSelectedBookmarkId(selectedId);

    const bookmark = bookmarks.find((b) => b.id === selectedId);

    if (bookmark) {
      setSelectedBookmarkTown(bookmark.town);
      setSelectedBookmarkFlatType(bookmark.flatType);
    } else {
      setSelectedBookmarkTown("");
      setSelectedBookmarkFlatType("");
    }
  };

  const handleRemoveAllBookmarks = async (e) => {
    e.preventDefault();

    try {
      const existingBookmarks = await fetchBookmarkedTowns();
      if (existingBookmarks.length === 0) {
        alert("No bookmarks to remove.");
        return;
      }

      if (
        window.confirm(
          "Are you sure you want to remove all bookmarks?\nThis action cannot be undone."
        )
      ) {
        setLoading(true);
        console.log("OK.");

        await deleteAllBookmarks();

        const updatedBookmarks = await fetchBookmarkedTowns();

        setBookmarks(updatedBookmarks);
        setSelectedBookmarkId("");
        setSelectedBookmarkTown("");
        setSelectedBookmarkFlatType("");

        alert("All bookmarks removed successfully!");
      } else {
        console.log("Cancel is clicked.");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBookmark = async (e) => {
    e.preventDefault();

    try {
      await deleteBookmark(selectedBookmarkId);

      const updatedBookmarks = await fetchBookmarkedTowns();
      setBookmarks(updatedBookmarks);
      setSelectedBookmarkId("");
      setSelectedBookmarkTown("");
      setSelectedBookmarkFlatType("");

      if (updatedBookmarks.length === 0) {
        setSelectedBookmarkId("");
        setSelectedBookmarkTown("");
        setSelectedBookmarkFlatType("");
      }

      alert("Bookmark removed successfully!");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container className="mb-4 custom-font-size-town">
      <h5 className="mb-4 colorTitle">
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
              variant="secondary"
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
              variant="secondary"
              size="sm"
              className="mt-2 me-2"
              onClick={handleClear}
              style={{ fontSize: ".9em" }}
            >
              Clear Filter
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="mt-2"
              style={{ fontSize: ".9em" }}
              onClick={handleAddBookmarks}
            >
              Add to Bookmarks
            </Button>
          </div>
        </Col>

        <Col>
          <h5 className="text1">Bookmark</h5>
          <Form className="border p-3 " onSubmit={handleBookmarkSubmit}>
            <Form.Group controlId="Bookmark-select">
              {bookmarks.length > 0 ? (
                <Form.Control
                  // as="select"
                  // value={selectedBookmark}
                  // onChange={(e) => setSelectedBookmark(e.target.value)}
                  // style={{ fontSize: ".9em" }}

                  as="select"
                  value={selectedBookmarkId} // Value is now the selectedBookmarkId
                  onChange={handleBookmarkChange}
                  style={{ fontSize: ".9em" }}
                >
                  <option value="" disabled>
                    Select a Bookmark
                  </option>
                  {bookmarks.map((item) => (
                    <option key={item.id} value={item.id}>
                      Town: {item.town} / Flat Type: {item.flatType}
                    </option>
                  ))}
                </Form.Control>
              ) : (
                <Form.Text>No Bookmarks</Form.Text>
              )}
            </Form.Group>

            {/* <Button
              variant="secondary"
              size="sm"
              type="submit"
              className="mt-2 me-2"
              style={{ fontSize: ".9em" }}
              // onClick={handleBookmarkChange}
            >
              Submit
            </Button> */}

            <Button
              variant="warning"
              size="sm"
              className="mt-2 ms-2"
              style={{ fontSize: ".9em" }}
              onClick={handleRemoveBookmark}
              disabled={!selectedBookmarkId} // Disable button if no bookmark is selected
            >
              Remove
            </Button>

            <Button
              variant="danger"
              size="sm"
              className="mt-2 ms-2"
              style={{ fontSize: ".9em" }}
              onClick={handleRemoveAllBookmarks}
            >
              {" "}
              Remove All Bookmarks
            </Button>
            {loading && (
              <Form.Text
                className="mt-2 ms-2"
                style={{
                  display: "inline-block",
                  marginLeft: "10px",
                  fontSize: "1.1em",
                  verticalAlign: "middle",
                  fontWeight: "bold",
                }}
              >
                Loading...
              </Form.Text>
            )}
          </Form>
        </Col>
      </Row>

      <Row className="d-flex">
        <Col className="d-flex flex-column">
          <h5 className="text1 mt-5 mb-3">Selected Town Analysis</h5>
          <div className="border p-3 rounded">
            <Row className="g-2">
              <Col className="d-flex flex-column gap-2">
                <h5 className="colorSubTitle">Median | Mean Price</h5>
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
                <h5 className="colorSubTitle">Lowest | Highest Price</h5>
                <div className="d-flex flex-column flex-fill shadow border-primary p-3 bg-white rounded townAggText">
                  <TownHighLowPrice
                    townFilter={townFilter}
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
          <h5 className="text1 mt-5 mb-3">Bookmarked Town Analysis</h5>
          <div className="border p-3 rounded">
            <Row className="g-2">
              <Col className="d-flex flex-column gap-2">
                <h5 className="colorSubTitle">Median | Mean Price</h5>
                <div className="d-flex flex-column flex-fill shadow border-primary p-3 bg-white rounded townAggText">
                  <BookmarkAgg
                    meanPriceBookmark={meanPriceBookmark}
                    medianPriceBookmark={medianPriceBookmark}
                    unitCountBookmark={unitCountBookmark}
                    loading={loading}
                    selectedBookmarkTown={selectedBookmarkTown}
                    selectedBookmarkFlatType={selectedBookmarkFlatType}
                  />
                </div>
              </Col>
            </Row>
            <Row className="g-2 mt-3">
              <Col className="d-flex flex-column gap-2">
                <h5 className="colorSubTitle">Lowest | Highest Price</h5>
                <div className="d-flex flex-column flex-fill shadow border-primary p-3 bg-white rounded townAggText">
                  <BookmarkHighLowPrice
                    lowestPriceBookmark={lowestPriceBookmark}
                    highestPriceBookmark={highestPriceBookmark}
                    loading={loading}
                    selectedBookmarkTown={selectedBookmarkTown}
                    selectedBookmarkFlatType={selectedBookmarkFlatType}
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
