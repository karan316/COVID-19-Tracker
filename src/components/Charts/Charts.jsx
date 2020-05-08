import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { fetchDailyData } from "../../api";
import moment from "moment";

const Charts = ({ data: { confirmed, deaths, recovered }, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const dailyData = await fetchDailyData();
            setDailyData(dailyData);
        };

        fetchAPI();
    }, []);
    const lineChart = {
        options: {
            chart: {
                id: "line-chart",
            },
            xaxis: {
                // TODO
                // categories: dailyData.map(({ data }) => data),
            },
        },
        series: [
            {
                name: "Infected",
                data: dailyData.map(({ confirmed }) => confirmed),
            },
            {
                name: "Deaths",
                data: dailyData.map(({ deaths }) => deaths),
            },
        ],
    };

    const barChart = confirmed
        ? {
              options: {
                  chart: {
                      id: "bar-chart",
                  },
              },
              series: [
                  {
                      name: "Infected",
                      data: [confirmed.value],
                  },
                  {
                      name: "Recovered",
                      data: [recovered.value],
                  },
                  {
                      name: "Deaths",
                      data: [deaths.value],
                  },
              ],
          }
        : null;
    const chart = country ? barChart : lineChart;
    const chartType = country ? "bar" : "line";
    return (
        <div>
            <Chart
                options={chart.options}
                series={chart.series}
                type={chartType}
                width='1000px'
            />
        </div>
    );
};

export default Charts;
