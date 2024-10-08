import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Route, Routes } from "react-router-dom";
import NaviBar from "./components/NaviBar";
import Footer from "./components/Footer";
import Town from "./components/Town";
import IslandWide from "./components/IslandWide";
import HighestPriceMonth from "./components/HighestPriceMonth";
import ChartHomeUnits from "./components/ChartHomeUnits";
import DashboardSection from "./components/DashboardSection";
import { getHdbFilteredPreviousMonth } from "./services/Api";
import { useEffect, useState } from "react";
import { parse, format } from "date-fns";
import bgImage from "./assets/bg1.jpg";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPreviousMonth = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  };

  const previousMonthString = getPreviousMonth();
  const previousMonthDate = parse(previousMonthString, "yyyy-MM", new Date());
  const formattedMonth = format(previousMonthDate, "MMM yyyy");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const records = await getHdbFilteredPreviousMonth(previousMonthString);
        // console.log(`Total Records: ${records.length}`);
        setData(records);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [previousMonthString]);

  return (
    <div className="app-container">
      <Container className="mb-4">
        <NaviBar />
      </Container>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="image-dashboard-container">
                <img
                  src={bgImage}
                  alt="Background"
                  className="background-image"
                />
                <div className="dashboard-section-container">
                  <DashboardSection
                    totalRecords={data.length}
                    displayMonth={formattedMonth}
                  />
                </div>
                <div className="caption-container">
                  <h1
                    className="caption-text"
                    style={{
                      fontSize: "4rem",
                      color: "#8e44ad",
                    }}
                  >
                    Re.Flat
                  </h1>
                  <h2 className="caption-text" style={{ fontSize: "1.5rem" }}>
                    Resale Flat Information and Analysis Portal
                  </h2>
                </div>
              </div>

              <Container className="other-content-container">
                <div className="d-flex flex-column align-items-center">
                  <h2
                    className="align-items-center"
                    style={{
                      fontSize: "1.5rem",
                      color: "#607d8b",
                      fontWeight: "bold",
                    }}
                  >
                    Previous Month Analysis
                  </h2>
                </div>
                <Row className="g-2">
                  <Col className="d-flex flex-column gap-2">
                    <div className="shadow border-primary p-3 bg-white rounded">
                      <HighestPriceMonth
                        data={data}
                        loading={loading}
                        getPreviousMonth={getPreviousMonth}
                        formattedMonth={formattedMonth}
                      />
                    </div>
                  </Col>
                  <Col>
                    <div className="shadow border-primary p-3 bg-white rounded">
                      <ChartHomeUnits
                        data={data}
                        loading={loading}
                        formattedMonth={formattedMonth}
                        getPreviousMonth={getPreviousMonth}
                      />
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          }
        />
        <Route path="/town" element={<Town />} />
        <Route path="/islandwide" element={<IslandWide />} />
      </Routes>

      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
