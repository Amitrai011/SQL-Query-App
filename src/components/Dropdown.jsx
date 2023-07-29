import React, { useEffect, useState } from 'react';
import styles from "../styles/dropdown.module.css"

const Dropdown = ({ setQueryResult, setQuery, setColumn, csvData, preDefinedCommands }) => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        handlePredefinedQuery(event.target.value);
        setQuery(event.target.value);
        setQueryResult([]);
    };

    const handleColumnQuery = (columnName) => {
        const columnValues = csvData.map((row) => {
            return row[columnName];
        });

        return columnValues;
    }

    const handlePredefinedQuery = (command) => {
        const columnName = command.split(" ")[1];
        const column = handleColumnQuery(columnName);
        setColumn(column);
    }

    useEffect(() => {
        if (preDefinedCommands.length > 0) {
            setQuery(preDefinedCommands[0]);
        }
    }, [preDefinedCommands]);

    return (
        <select className={styles.selectOptions} value={selectedOption} onChange={handleOptionChange}>
            {preDefinedCommands.map((command, index) => (
                <option className={styles.selectOptions} key={index} value={command}>
                    {command}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;