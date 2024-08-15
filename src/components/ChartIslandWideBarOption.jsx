import { Chart } from "react-google-charts";

const BarChartOption = ({ data, options }) => {
  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="500px"
      data={data}
      options={options}
    />
  );
};

export default BarChartOption;
