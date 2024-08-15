export const chartHomeUnitsOptions = {
  chartArea: { left: 200, top: 5, bottom: 60 },
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
    },
    ticks: [
      { v: 0, f: "0" },
      { v: 100, f: "100" },
      { v: 200, f: "200" },
      { v: 300, f: "300" },
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
  colors: ["#607d8b"],
  animation: {
    startup: true,
    easing: "ease-in",
    duration: 600,
  },
};
