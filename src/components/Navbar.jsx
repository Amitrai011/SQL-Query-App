import React from 'react'
import styles from "../styles/navbar.module.css";
import globalStyles from "../styles/global.module.css";

function Navbar({ setShowStatistics, setExportClick, setVisualizeData, handlFileChange }) {
    return (
        <nav className={styles.navbar}>
            <div className={styles.leftNavView}>
                <img width="35px" height="35px" src="./assests/database.png" alt="Database Image" />
                <p style={{ fontSize: "1.5rem" }}>SQL Query</p>
            </div>
            <div className={styles.btnWrapper}>
                <label className={styles.fileStyle} htmlFor="file">
                    <img loading="lazy" style={{ marginRight: "0.4rem" }} width="25px" height="30px" src="./assests/file.png" alt="file Image" />
                    Upload a CSV file
                </label>
                <input style={{ display: "none" }} id="file" type="file" accept=".csv" onChange={handlFileChange} />
                <button onClick={() => setShowStatistics(true)} className={globalStyles.primaryBtn} style={{ marginTop: "0", marginBottom: "0" }}>Show Statistics</button>
                <button onClick={() => setVisualizeData(true)} className={globalStyles.primaryBtn}>Visualize Data</button>
                <button className={globalStyles.primaryBtn} onClick={() => setExportClick(true)}>API Query</button>
                <hr />
            </div>
        </nav>
    )
}

export default Navbar
