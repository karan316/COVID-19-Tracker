import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { fetchDailyData } from "../../api";
import moment from "moment";

var getDaysArray = function (start, end) {
    for (
        var arr = [], dt = new Date(start);
        dt <= end;
        dt.setDate(dt.getDate() + 1)
    ) {
        arr.push(new Date(dt));
    }
    return arr;
};

// var daylist = getDaysArray(new Date("2020-01-22"), new Date());
// console.log(daylist.map((v) => v.toISOString().slice(0, 10)));

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
                id: "area-datetime",
                type: "area",
                zoom: {
                    autoScaleYaxis: true,
                },
            },
            title: {
                text: "Days",
            },
            // categories: dailyData.map(({ data }) => data),
        },
        annotations: {
            xaxis: [
                {
                    x: new Date().getTime(),
                    borderColor: "#999",
                    yAxisIndex: 0,
                    label: {
                        show: true,
                        text: "Rally",
                        style: {
                            color: "#fff",
                            background: "#775DD0",
                        },
                    },
                },
            ],
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

        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 0,
            style: "hollow",
        },
        xaxis: {
            type: "datetime",
            min: new Date("01 Jan 2020").getTime(),
            tickAmount: 6,
        },
        tooltip: {
            x: {
                format: "dd MMM yyyy",
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100],
            },
        },
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
        <div style={{ width: "80%" }}>
            <Chart
                options={chart.options}
                series={chart.series}
                type={chartType}
                width='100%'
            />
        </div>
    );
};

export default Charts;
