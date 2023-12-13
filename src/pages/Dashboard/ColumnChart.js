// ColumnChart.js
import ReactApexChart from "react-apexcharts";

const ColumnChart = ({ dataColors, periodData, donationCountsByDate }) => {
  const options = {
    chart: {
      stacked: !0,
      toolbar: {
        show: 1
      },
      zoom: {
        enabled: !0
      }
    },
    plotOptions: {
      bar: {
        horizontal: !1,
        columnWidth: "15%",
        endingShape: "rounded"
      }
    },
    dataLabels: {
      enabled: !1
    },
    xaxis: {
      categories: donationCountsByDate,
      labels: {
        show: true,
      },
    },
    colors: dataColors,
    legend: {
      position: "bottom"
    },
    fill: {
      opacity: 1
    }
  };

  return (
    <>
      <ReactApexChart options={options} series={periodData} type="bar" height="359" className="apex-charts" />
    </>
  );
};

export default ColumnChart;
