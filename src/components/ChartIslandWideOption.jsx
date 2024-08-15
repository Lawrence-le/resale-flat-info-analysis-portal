import { Chart } from "react-google-charts";

const ChartIslandWideOption = ({ data, options }) => {
  return (
    <Chart
      chartType="ScatterChart"
      width="100%"
      height="600px"
      data={data}
      options={options}
    />
  );
};

export default ChartIslandWideOption;
