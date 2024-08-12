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

function HomePage() {
  return (
    <>
      <Container>
        <Row className="g-2">
          <Col className="d-flex flex-column gap-2">
            <div className="d-flex flex-column flex-fill shadow border-primary p-3 bg-white rounded">
              <HighestPriceMonth />
            </div>
            <div className="d-flex flex-column flex-fill shadow border-primary p-3 bg-white rounded">
              <HighestPriceMonth />
            </div>
          </Col>

          <Col>
            <div className="d-flex flex-column flex-fill shadow border-primary p-3 bg-white rounded">
              <ChartHomeUnits />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

function App() {
  return (
    <div className="app-container">
      <Container className="mb-4">
        <NaviBar />
      </Container>
      <Container className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Town" element={<Town />} />
          <Route path="/IslandWide" element={<IslandWide />} />
        </Routes>
      </Container>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
