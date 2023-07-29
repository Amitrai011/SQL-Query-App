// getDataSets() function returns the pair of columns

const getDataSets = (columnNames) => {
    const dataSets = [];
    for (let i = 0; i < columnNames.length; i++) {
        for (let j = 0; j < columnNames.length; j++) {
            if (i !== j) {
                dataSets.push({
                    xAxis: columnNames[i],
                    yAxis: columnNames[j]
                });
            }
        }
    }

    return dataSets;
}

export {
    getDataSets
}