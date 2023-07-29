import React, { useState, useRef, useCallback } from 'react';
import styles from "../styles/modal.module.css";
import dropDownStyles from "../styles/dropdown.module.css"
import DataVisualization from './DataVisualization';
import { getDataSets } from '../utilities/DataSets';
import dataQueryStyles from "../styles/dataquery.module.css";
import globalStyles from "../styles/global.module.css"

function BarGraph({ csvData, setVisualizeData }) {

    const keys = Object.keys(csvData[0]);
    const dataSets = getDataSets(keys);
    const chartTypes = ["Bar", "Line", "Doughnut", "Radar", "PolarArea", "Pie"];
    const [selectedDataLabel, setSelectedDataLabel] = useState([keys[1], keys[0]]);
    const [selectedOption, setSelectedOption] = useState("Bar");
    const chartRef = useRef();

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSelectedLabels = (event) => {
        setSelectedDataLabel(event.target.value.split(","));
    };

    const downloadChart = useCallback(() => {
        const link = document.createElement("a");
        link.download = "chart.png";
        link.href = chartRef.current.toBase64Image();
        link.click();
    }, []);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <img
                    className={styles.closeButton}
                    style={{ cursor: "pointer" }}
                    width="30px"
                    height="30px"
                    src="../assests/close.png"
                    loading="lazy"
                    onClick={() => setVisualizeData(false)}
                    alt="Close Icon"
                />
                <div className={styles.topBar}>
                    <select className={dropDownStyles.selectOptions} value={selectedOption} onChange={handleOptionChange}>
                        {chartTypes.map((chartType, index) => {
                            return <option key={index} className={dropDownStyles.selectOptions} value={chartType}>
                                {chartType}
                            </option>
                        })}
                    </select>
                    <select onChange={handleSelectedLabels} className={dropDownStyles.selectOptions}>
                        {dataSets.map((data, index) => {
                            return (
                                <option key={index} className={dropDownStyles.selectOptions}>
                                    {data.xAxis},{data.yAxis}
                                </option>
                            )
                        })}
                    </select>
                    <button
                        className={globalStyles.primaryBtn}
                        style={{ backgroundColor: "#537fe7", color: "white", margin: "0", padding: "0.5rem" }}
                        onClick={downloadChart}
                    >
                        Download Chart
                    </button>
                </div>
                <DataVisualization chartRef={chartRef} chartType={selectedOption} data={csvData} dataLabel={selectedDataLabel} />
            </div>
        </div>
    );

}

export default BarGraph
