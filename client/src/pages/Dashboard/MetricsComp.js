import { Card } from "reactstrap";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactApexChart from "react-apexcharts";

const MetricsComp = () => {
  // State to store category totals
  const [categoryTotals, setCategoryTotals] = useState({
    totalFood: 0,
    totalMoney: 0,
    totalCloth: 0,
    totalBooks: 0,
  });

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the "/myevent" endpoint
        const response = await fetch('/myevent', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            // Add any headers you need, such as authentication headers
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        console.log('Data fetched successfully!');

        const data = await response.json();

        // Log the entire data object to inspect its structure
        console.log('Received Data:', data);

        // Extract category totals from the server response
        const { categoryTotals } = data;

        // Log the category totals to the console
        console.log('Category Totals:', categoryTotals);

        // Calculate the total of all categories
        const totalAllCategories = categoryTotals.totalMoney + categoryTotals.totalBooks + categoryTotals.totalFood + categoryTotals.totalCloth;

        // Log the total of all categories to the console
        console.log('Total All Categories:', totalAllCategories);

        // Extract values from categoryTotals state
        const { totalFood, totalMoney, totalCloth, totalBooks } = categoryTotals;

        // Update series and options based on category totals
        const newSeries = [totalMoney, totalBooks, totalFood, totalCloth];

        // Construct options based on category totals
        const newOptions = {
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  fontSize: "22px",
                },
                value: {
                  fontSize: "16px",
                },
                total: {
                  show: true,
                  label: "Total",
                  formatter: function () {
                    // Display the total of all categories
                    return totalAllCategories;
                  },
                },
              },
              fill: {
                type: 'gradient', // You can also use 'solid' or 'pattern'
                gradient: {
                  shade: 'dark',
                  type: 'horizontal',
                  shadeIntensity: 0.5,
                  gradientToColors: ["#ff8c00", "#4caf50", "#2196f3", "#e91e63"], // Replace with your preferred colors
                  inverseColors: false,
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [0, 100]
                }
              }
            },
          },
          labels: ["Money", "Book", "Food", "Cloth"],
          colors: ["primary", "primary", "primary", "primary"],
        };

        // Set the series and options in state
        setSeries(newSeries);
        setOptions(newOptions);

      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <div className="text-center">
        <h5>Donations Recieved</h5>
        <div className="d-flex justify-content-center">
          <div className="d-flex align-items-end px-2">
            <FontAwesomeIcon icon="fa-solid fa-caret-up" color="green"/>
          </div>
        </div>
        <ReactApexChart
          options={options}
          series={series}
          type="radialBar"
          height="230"
          className="apex-charts"
        />
      </div>
    </Card>
  )
}

export default MetricsComp;
