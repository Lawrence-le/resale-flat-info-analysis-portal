// ChartIslandWide.jsx
import { useState, useEffect } from "react";
import { getHdb } from "../services/Api";
import ChartIslandWideOption from "./ChartIslandWideOption";
import BasicExample from "./Spinner";
import { format } from "date-fns";

const getYear = new Date().getFullYear();

const ChartIslandWide = ({ chart2Selection }) => {
  const [chartData, setChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await getHdb(getYear);

        let scatterData;

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

        const allChartOptions = () => ({
          legend: "none",
          left: 50,
          top: 50,
          width: "10%",
          height: "70%",
          colors: ["#0d6efd"],
          pointShape: "circle",
          pointSize: 5,
        });

        if (chart2Selection === "21") {
          scatterData = data.map((item) => [
            parseFloat(item.floor_area_sqm),
            parseFloat(item.resale_price),
            formatTooltip(item),
          ]);
          scatterData.unshift([
            "Floor Area (sqm)",
            "Resale Price (SGD)",
            { role: "tooltip", type: "string", p: { html: true } },
          ]);
          setChartOptions({
            title: "Resale Price vs Floor Area (sqm)",
            hAxis: { title: "Floor Area (sqm)" },
            vAxis: { title: "Resale Price (SGD)" },
            ...allChartOptions(),
          });
        } else if (chart2Selection === "22") {
          scatterData = data.map((item) => [
            parseFloat(item.remaining_lease),
            parseFloat(item.resale_price),
            formatTooltip(item),
          ]);
          scatterData.unshift([
            "Remaining Lease (years)",
            "Resale Price (SGD)",
            { role: "tooltip", type: "string", p: { html: true } },
          ]);

          setChartOptions({
            title: "Resale Price vs Remaining Lease",
            hAxis: { title: "Remaining Lease (years)" },
            vAxis: { title: "Resale Price (SGD)" },
            ...allChartOptions(),
          });
        }
        setChartData(scatterData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (chart2Selection) {
      fetchData();
    }
  }, [chart2Selection]);

  if (loading) {
    return <BasicExample />;
  }

  return <ChartIslandWideOption data={chartData} options={chartOptions} />;
};

export default ChartIslandWide;
