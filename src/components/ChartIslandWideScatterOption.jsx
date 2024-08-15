// ScatterChartOption.jsx
import { Chart } from "react-google-charts";

const ScatterChartOption = ({ data, options }) => {
  return (
    <Chart
      chartType="ScatterChart"
      width="100%"
      height="500px"
      data={data}
      options={options}
    />
  );
};

export default ScatterChartOption;
