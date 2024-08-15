import "bootstrap/dist/css/bootstrap.min.css";
import { Chart } from "react-google-charts";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { chartHomeUnitsOptions } from "./ChartHomeUnitsOptions";
import { getHdbFilteredPreviousMonth } from "../services/Api";

export function ChartHomeUnits({ getPreviousMonth }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartTitle, setChartTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const previousMonthString = getPreviousMonth();
        const records = await getHdbFilteredPreviousMonth(previousMonthString);
        // console.log(`Total Records: ${records.length}`);
        setData(records);

        const formattedMonth = new Date(
          `${previousMonthString}-01`
        ).toLocaleString("default", { month: "short", year: "numeric" });
        setChartTitle(`No. of units transacted by Towns (${formattedMonth})`);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getPreviousMonth]);

  function countTowns(records) {
    const townCountMap = {};

    records.forEach((e) => {
      const i = e.town;

      if (townCountMap[i]) {
        townCountMap[i]++;
      } else {
        townCountMap[i] = 1;
      }
    });

    return townCountMap;
  }

  const townCounts = countTowns(data);

  const sortedByKey = Object.entries(townCounts).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  const sortedTownCountsByKey = Object.fromEntries(sortedByKey);

  const chartData = [
    ["Town", "Transactions"],
    ...Object.entries(sortedTownCountsByKey).map(([town, count]) => [
      town,
      Number(count),
    ]),
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chart-container">
      <Row className="justify-content-center text-center">
        <Col>
          <p className="hpCompTitle">{chartTitle}</p>
        </Col>
      </Row>
      <Chart
        chartType="BarChart"
        width="100%"
        height="600px"
        data={chartData}
        options={chartHomeUnitsOptions}
      />
    </div>
  );
}

export default ChartHomeUnits;
