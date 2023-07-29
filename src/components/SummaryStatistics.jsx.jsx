import React, { useEffect, useState } from 'react';
import styles from "../styles/modal.module.css";
import {
    calculateMean,
    calculateMedian,
    calculateMode,
    calculateStandardDeviation
} from '../utilities/Statistics';

const SummaryStatistics = ({ data, setShowStatistics }) => {
    const [statistics, setStatistics] = useState({});

    const calculateSummaryStatistics = () => {
        const numericalColumns = {};
        const columns = Object.keys(data[0]);

        columns.forEach((column) => {
            const values = data.map((row) => Number(row[column])).filter((value) => !isNaN(value));
            if (values.length > 0) {
                numericalColumns[column] = {
                    min: Math.min(...values),
                    max: Math.max(...values),
                    count: values.length,
                    mean: calculateMean(values),
                    median: calculateMedian(values),
                    mode: calculateMode(values),
                    stdDev: calculateStandardDeviation(values),
                };
            }
        });

        setStatistics(numericalColumns);
    };

    useEffect(() => {
        if (data.length > 0) {
            calculateSummaryStatistics();
        }
    }, [data]);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal} style={{ overflow: "auto" }}>
                <h1 style={{ textAlign: "center", marginTop: "-0.3rem" }}>Summary Statistics</h1>
                <img
                    className={styles.closeButton}
                    style={{ cursor: "pointer" }}
                    width="30px"
                    src="../assests/close.png"
                    loading="lazy"
                    onClick={() => setShowStatistics(false)}
                />
                {Object.keys(statistics).map((column) => (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }} key={column}>
                        <h2>{column}:</h2>
                        <p>Mean: {statistics[column].mean}</p>
                        <p>Median: {statistics[column].median}</p>
                        <p>Mode: {statistics[column].mode.join(', ')}</p>
                        <p>Standard Deviation: {statistics[column].stdDev}</p>
                        <p>Min: {statistics[column].min}</p>
                        <p>Max: {statistics[column].max}</p>
                        <p>Count: {statistics[column].count}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SummaryStatistics;
