import React, { useEffect, useState } from 'react'
import DataQuery from "./DataQuery";
import Papa from 'papaparse';

function MainArea() {

    const [csvData, setCsvData] = useState([]);

    useEffect(() => {
        Papa.parse('./products.csv', {
            download: true,
            header: true,
            complete: (result) => {
                setCsvData(result.data);
            },
        });
    }, []);

    return (
        <div style={{ width: "100%" }}>
            <DataQuery csvData={csvData} setCsvData={setCsvData} />
        </div>
    )
}

export default MainArea
