import { useState, useEffect } from "react";
import { getHdb } from "../services/Api";
import BarChartOption from "./ChartIslandWideBarOption";
import ScatterChartOption from "./ChartIslandWideScatterOption";
import BasicExample from "./Spinner";
import { format } from "date-fns";

const getYear = new Date().getFullYear();

const ChartIslandWide = ({ chart1Selection, chart2Selection }) => {
  const [barChartData, setBarChartData] = useState([]);
  const [barChartOptions, setBarChartOptions] = useState({});
  const [scatterChartData, setScatterChartData] = useState([]);
  const [scatterChartOptions, setScatterChartOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [maxMonth, setMaxMonth] = useState("");
  const [minMonth, setMinMonth] = useState("");
  const [totalCount, setTotalCount] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await getHdb(getYear);

        const months = data.map((record) => record.month);

        const sortedMonths = months.sort((a, b) => new Date(a) - new Date(b));

        const getMinMonth = sortedMonths[0];
        const getMaxMonth = sortedMonths[sortedMonths.length - 1];
        const getCount = data.length;

        setMinMonth(getMinMonth);
        setMaxMonth(getMaxMonth);
        setTotalCount(getCount);

        const formatTooltip = (item) => `
      Resale Price: ${item.resale_price} SGD
      Month:  ${format(new Date(item.month + "-01"), "MMM yyyy")}
      Town: ${item.town} 
      Flat Type: ${item.flat_type}
      Block: ${item.block}
      Street Name: ${item.street_name}
      Storey Range: ${item.storey_range}
      Floor Area: ${item.floor_area_sqm} sqm
      Flat Model: ${item.flat_model}
      Lease Commence Date: ${item.lease_commence_date}
      Remaining Lease: ${item.remaining_lease}
  `;

        if (chart1Selection === "11") {
          //* Bar chart for total units transacted

          const unitsData = {};

          data.forEach((item) => {
            const town = item.town;

            if (unitsData[town]) {
              unitsData[town] += 1;
            } else {
              unitsData[town] = 1;
            }
          });

          const barData = [["Town", "Units Transacted"]];

          Object.keys(unitsData).forEach((town) => {
            const units = unitsData[town];
            barData.push([town, units]);
          });

          const barOptions = {
            title: "Total Units Transacted by Town",
            chartArea: { left: 200, top: 40, bottom: 80 },
            hAxis: {
              title: "Total Transactions",
              minValue: 0,
              maxValue: 300,
              titleTextStyle: {
                fontSize: 14,
                bold: true,
                italic: false,
              },
              textStyle: {
                fontSize: 14,
                bold: true,
              },
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
            colors: ["#607d8b"],
            animation: {
              startup: true,
              easing: "ease-in",
              duration: 600,
            },
          };
          // console.log("Bar Data:", barData);
          // console.log("Bar Options:", barOptions);
          setBarChartData(barData);
          setBarChartOptions(barOptions);
        } else if (chart2Selection === "21") {
          //* Scatter plot for resale price vs floor area
          const scatterData = data.map((item) => [
            parseFloat(item.floor_area_sqm),
            parseFloat(item.resale_price),
            formatTooltip(item),
          ]);
          scatterData.unshift([
            "Floor Area (sqm)",
            "Resale Price (SGD)",
            { role: "tooltip", type: "string", p: { html: true } },
          ]);
          const scatterOptions = {
            chartArea: { left: 200, top: 40, bottom: 80 },
            title: "Resale Price vs Floor Area (sqm)",
            hAxis: { title: "Floor Area (sqm)" },
            vAxis: { title: "Resale Price (SGD)" },
            legend: "none",
            colors: ["#607d8b"],
          };

          setScatterChartData(scatterData);
          setScatterChartOptions(scatterOptions);
        } else if (chart2Selection === "22") {
          //* Scatter plot for resale price vs remaining lease
          const scatterData = data.map((item) => [
            parseFloat(item.remaining_lease),
            parseFloat(item.resale_price),
            formatTooltip(item),
          ]);
          scatterData.unshift([
            "Remaining Lease (years)",
            "Resale Price (SGD)",
            { role: "tooltip", type: "string", p: { html: true } },
          ]);
          const scatterOptions = {
            title: "Resale Price vs Remaining Lease",
            hAxis: { title: "Remaining Lease (years)" },
            vAxis: { title: "Resale Price (SGD)" },
            legend: "none",
            colors: ["#607d8b"],
          };

          setScatterChartData(scatterData);
          setScatterChartOptions(scatterOptions);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (chart1Selection || chart2Selection) {
      fetchData();
    }
  }, [chart1Selection, chart2Selection]);

  if (loading) {
    return <BasicExample />;
  }

  return (
    <>
      <h5 className="mb-3 colorSubTitle d-flex flex-column align-items-center">
        {minMonth
          ? ` (${format(new Date(minMonth + "-01"), "MMM yyyy")} to `
          : ""}
        {maxMonth ? `${format(new Date(maxMonth + "-01"), "MMM yyyy")})` : ""}{" "}
      </h5>{" "}
      <div className="text1">Total Count: {totalCount}</div>
      {chart1Selection === "11" ? (
        <BarChartOption data={barChartData} options={barChartOptions} />
      ) : chart2Selection ? (
        <ScatterChartOption
          data={scatterChartData}
          options={scatterChartOptions}
        />
      ) : (
        <p>.</p>
      )}
    </>
  );
};

export default ChartIslandWide;
