export const chartHomeUnitsOptions = {
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
