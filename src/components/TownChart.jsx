import { Chart } from "react-google-charts";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import { getHdb } from "../services/Api";
import { useEffect, useState } from "react";
import { parse, format, min, max } from "date-fns"; // Assuming you mean `date.js` refers to `date-fns`
import BasicExample from "./Spinner";

// Options for the chart
export const townChartOptions = {
  // title: "No. of units transacted by Towns (Feb 2024 to Aug 2024)",
  // backgroundColor: "#E4E4E4",
  chartArea: { left: 200, top: 5, bottom: 60 },
  hAxis: {
    title: "Total Transactions",
    minValue: 0,
    maxValue: 1200,
    titleTextStyle: {
      fontSize: 14,
      bold: true,
      italic: false,
    },
    textStyle: {
      fontSize: 14,
    },
    ticks: [
      { v: 0, f: "0" },
      { v: 200, f: "200" },
      { v: 400, f: "400" },
      { v: 600, f: "600" },
      { v: 800, f: "800" },
      { v: 1000, f: "1000" },
      { v: 1200, f: "1200" },
    ],
  },
  vAxis: {
    title: "Town",
    titleTextStyle: {
      fontSize: 14,
      bold: true,
      italic: false,
    },
    textStyle: {
      fontSize: 10,
    },
  },
  legend: { position: "none" },
  colors: ["#0d6efd"],
  animation: {
    startup: true,
    easing: "ease-in",
    duration: 600,
  },
};

export function TownChart() {
  const [data, setData] = useState([["Town", "Transactions"]]);
  const [loading, setLoading] = useState(true);
  const [chartTitle, setChartTitle] = useState(
    "No. of units transacted by Towns"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const records = await getHdb();

        const months = records.map((record) =>
          parse(record.month, "yyyy-MM", new Date())
        );
        const minMonth = format(min(months), "MMM yyyy");
        const maxMonth = format(max(months), "MMM yyyy");

        setChartTitle(
          `No. of units transacted by Towns (${minMonth} to ${maxMonth})`
        );

        // Count transactions by town
        const townCounts = countTowns(records);

        // Sort towns by alphabetical order
        const sortedByKey = Object.entries(townCounts).sort(([a], [b]) =>
          a.localeCompare(b)
        );

        // Convert sorted array back to object
        const sortedTownCountsByKey = Object.fromEntries(sortedByKey);

        // Prepare chart data
        const townCountsData = [
          ["Town", "Transactions"],
          ...Object.entries(sortedTownCountsByKey).map(([town, count]) => [
            town,
            Number(count),
          ]), // Ensure count is a number
        ];

        console.log("Town Counts:", sortedTownCountsByKey);
        console.log("Town Count Data:", townCountsData);

        setData(townCountsData);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false); // Set loading to false after data fetching is complete
      }
    };

    fetchData();
  }, []);

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
  if (loading) {
    return <BasicExample />;
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
        data={data}
        options={townChartOptions}
      />
    </div>
  );
}

export default TownChart;
