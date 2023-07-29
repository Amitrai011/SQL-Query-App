import React, { useEffect, useState } from 'react';
import { Line, Bar, Radar, Doughnut, PolarArea, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"

const getBarChartConfig = (data, dataLabel) => {
    if (dataLabel) {
        return {
            labels: data.map((row) => row[dataLabel[0]]),
            datasets: [
                {
                    label: 'Products Metrics',
                    data: data.map((row) => row[dataLabel[1]])
                }
            ]
        };
    }
}

const DataVisualization = ({ chartRef, chartType, data, dataLabel }) => {

    const [chartConfig, setChartConfig] = useState(getBarChartConfig(data, dataLabel));

    useEffect(() => {
        setChartConfig(getBarChartConfig(data, dataLabel));
    }, [data, dataLabel]);

    return (
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {chartType === 'Bar' && <Bar ref={chartRef} data={chartConfig} />}
            {chartType === 'Line' && <Line ref={chartRef} data={chartConfig} />}
            {chartType === 'Doughnut' && <Doughnut ref={chartRef} data={chartConfig} />}
            {chartType === 'Radar' && <Radar ref={chartRef} data={chartConfig} />}
            {chartType === 'PolarArea' && <PolarArea ref={chartRef} data={chartConfig} />}
            {chartType === 'Pie' && <Pie ref={chartRef} data={chartConfig} />}
        </div>
    );
};

export default DataVisualization;