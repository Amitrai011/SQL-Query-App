import React, { useEffect, useState } from "react";
import Papa from 'papaparse';
import styles from "../styles/dataquery.module.css";
import globalStyles from "../styles/global.module.css";
import Dropdown from "./Dropdown";
import BarGraph from "./BarGraph"
import SummaryStatistics from "./SummaryStatistics.jsx";
import ApiQuery from "./ApiQuery";
import Navbar from "./Navbar";

function DataQuery({ csvData, setCsvData }) {

    const [queryResult, setQueryResult] = useState([]);
    const [query, setQuery] = useState("");
    const [column, setColumn] = useState([]);
    const [visualizeData, setVisualizeData] = useState(false);
    const [tableName, setTableName] = useState("Products");
    const [keys, setKeys] = useState([]);
    const [preDefinedCommands, setPreDefinedCommands] = useState([]);
    const [showStatistics, setShowStatistics] = useState(false);
    const [exportClick, setExportClick] = useState(false);

    const handleExecuteQuery = () => {
        if (query.length === 0) return;
        const que = query.split(" ");

        let matchedObjects = csvData.filter((row) => {
            const tableID = row[keys[0]];
            return que.includes(tableID);
        });

        if (matchedObjects.length === 0) {
            matchedObjects = csvData.map((row) => {
                return row[que[1]];
            });
            setColumn(matchedObjects);
        } else {
            setQueryResult(matchedObjects);
        }
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    }

    const handlFileChange = (event) => {
        const file = event.target.files[0];
        const fileName = file.name;
        const nameWithoutExtension = fileName.slice(0, fileName.lastIndexOf("."));
        const capitalizedFileName = nameWithoutExtension.charAt(0).toUpperCase() + nameWithoutExtension.slice(1);
        setTableName(capitalizedFileName);

        if (file) {
            Papa.parse(file, {
                download: true,
                header: true,
                complete: (result) => {
                    setCsvData(result.data);
                    setPreDefinedCommands([]);
                },
            });
        }
    }

    const downloadCsvFile = () => {
        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = tableName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    useEffect(() => {
        if (csvData.length > 0) {
            const keys = Object.keys(csvData[0]);
            setPreDefinedCommands(() => {
                const commands = keys.map((key) => {
                    return `SELECT ${key} FROM ${tableName};`;
                })
                return [`SELECT * FROM ${tableName};`, ...commands];
            })
            setKeys(keys);
        }
    }, [csvData]);

    return (
        <div>
            <Navbar
                setShowStatistics={setShowStatistics}
                setExportClick={setExportClick}
                setVisualizeData={setVisualizeData}
                handlFileChange={handlFileChange}
            />
            <div className={styles.editArea}>
                <div>
                    <h3 className={styles.queryLabel}>Please enter your SQL query below</h3>
                    {csvData.length > 0 &&
                        <textarea
                            id={styles.textarea}
                            value={query}
                            onChange={handleInputChange}
                            rows={8}
                            cols={45}
                            placeholder={`Enter your SQL query, for eg: SELECT * FROM ${tableName} WHERE ${keys[0]} == ${csvData[0][keys[0]]}`}
                        />}
                    <div className={styles.btnWrapper}>
                        <button style={{ backgroundColor: "#537fe7", color: "white", padding: "0.7rem 1.2rem" }} className={globalStyles.primaryBtn} onClick={handleExecuteQuery}>Run SQL</button>
                        <Dropdown setQueryResult={setQueryResult} setQuery={setQuery} setColumn={setColumn} csvData={csvData} preDefinedCommands={preDefinedCommands} />
                    </div>
                </div>
                {exportClick && <ApiQuery setCsvData={setCsvData} setExportClick={setExportClick} setTableName={setTableName} />}
                {visualizeData && <BarGraph csvData={csvData} setVisualizeData={setVisualizeData} />}
                {showStatistics && <SummaryStatistics data={csvData} setShowStatistics={setShowStatistics} />}
            </div>
            {queryResult.length > 0 &&
                <div style={{ padding: "1rem", backgroundColor: "#f8f9fa" }}>
                    <div style={{ margin: "0", padding: "0.5rem 0" }}>Number of Records: {queryResult.length}</div>
                    <table>
                        <thead>
                            <tr>
                                {Object.keys(queryResult[0]).map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {queryResult.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {Object.values(row).map((cell, cellIndex) => (
                                        <td key={cellIndex}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

            {query === preDefinedCommands[0] && (
                <div style={{ padding: "0 1rem", backgroundColor: "#f8f9fa", margin: "0 1rem", borderRadius: "8px" }}>
                    <div className={styles.resultDiv}>
                        <div style={{ margin: "0", padding: "0.8rem 0" }}>Number of Records: {csvData.length - 1}</div>
                        <button onClick={downloadCsvFile} style={{ margin: "0", padding: "0.6rem 0.5rem" }} className={globalStyles.primaryBtn}>Export to CSV file</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                {Object.keys(csvData[0]).map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {csvData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {Object.values(row).map((cell, cellIndex) => (
                                        <td key={cellIndex}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
            }

            {preDefinedCommands.map((cmd, cmdIndex) => {
                if (cmdIndex > 0 && cmd === query) {
                    return (
                        <div style={{ padding: "0 1rem", backgroundColor: "#f8f9fa" }}>
                            <div style={{ margin: "0", padding: "0.8rem 0" }}>Number of Records: {column.length - 1}</div>
                            <table key={cmdIndex}>
                                <thead>
                                    <tr>
                                        <th>{cmd}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {column.map((col, colIndex) => (
                                        <tr key={colIndex}>
                                            <td>{col}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                }
            })
            }
        </div>
    )
}

export default DataQuery
