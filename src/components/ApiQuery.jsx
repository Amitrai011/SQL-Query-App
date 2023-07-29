import React, { useState } from 'react'
import styles from "../styles/modal.module.css";
import globalStyles from "../styles/global.module.css";

function ApiQuery({ setCsvData, setExportClick, setTableName }) {

    const [api, setApi] = useState("");
    const [error, setError] = useState("");

    const modalStyle = {
        width: "30%",
        height: error.length > 0 ? "25%" : "20%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "1.2rem",
    }

    const inputStyle = {
        border: "none",
        backgroundColor: "#f8f9fa",
        fontSize: "1rem",
        padding: "0.8rem 1rem",
        borderRadius: "5px",
        width: "14rem",
        boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
    }

    const handleSubmit = async () => {
        try {
            const response = await fetch(api);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            Array.isArray(data) ? setCsvData(data) : setCsvData([data]);
            setError("");
            setExportClick(false);
            setTableName("Users");
            console.log("data: ", data);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className={styles.modalOverlay}>
            <div style={modalStyle} className={styles.modal}>
                <img loading="lazy" className={styles.closeButton} width="30px" onClick={() => setExportClick(false)} src="./assests/close.png" />
                <p style={{ marginTop: "0.6rem" }}>Enter the endpoint</p>
                <input onChange={(event) => setApi(event.target.value)} style={inputStyle} type="text" placeholder="Enter your API" />
                {error.length > 0 && <p style={{ color: "red" }}>{error}</p>}
                <button onClick={handleSubmit} style={{ margin: "0.7rem 0", padding: "0.6rem 1.5rem" }} className={globalStyles.primaryBtn}>Submit</button>
            </div>
        </div>
    )
}

export default ApiQuery