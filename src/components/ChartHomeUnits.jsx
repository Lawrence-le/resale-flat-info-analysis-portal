import { Chart } from "react-google-charts";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import { getHdb } from "../services/Api";
import { useEffect, useState } from "react";
import { parse, format, min, max } from "date-fns";
import { chartHomeUnitsOptions } from "./ChartOptions";
import BasicExample from "./Spinner";

export function ChartHome() {
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

        const townCounts = countTowns(records);

        const sortedByKey = Object.entries(townCounts).sort(([a], [b]) =>
          a.localeCompare(b)
        );

        const sortedTownCountsByKey = Object.fromEntries(sortedByKey);

        const townCountsData = [
          ["Town", "Transactions"],
          ...Object.entries(sortedTownCountsByKey).map(([town, count]) => [
            town,
            Number(count),
          ]),
        ];

        console.log("Town Counts:", sortedTownCountsByKey);
        console.log("Town Count Data:", townCountsData);

        setData(townCountsData);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
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
        options={chartHomeUnitsOptions}
      />
    </div>
  );
}

export default ChartHome;
