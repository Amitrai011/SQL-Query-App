const calculateMean = (values) => {
    return values.reduce((acc, val) => acc + val, 0) / values.length;
};

const calculateMedian = (values) => {
    const sortedValues = values.slice().sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedValues.length / 2);

    if (sortedValues.length % 2 === 0) {
        return (sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2;
    } else {
        return sortedValues[middleIndex];
    }
};

const calculateMode = (values) => {
    const valueCount = {};
    let maxCount = 0;
    let modes = [];

    values.forEach((value) => {
        valueCount[value] = (valueCount[value] || 0) + 1;

        if (valueCount[value] > maxCount) {
            maxCount = valueCount[value];
            modes = [value];
        } else if (valueCount[value] === maxCount) {
            modes.push(value);
        }
    });

    return modes;
};

const calculateStandardDeviation = (values) => {
    const meanValue = calculateMean(values);
    const squaredDifferences = values.map((value) => (value - meanValue) ** 2);
    const meanSquaredDifference = calculateMean(squaredDifferences);
    return Math.sqrt(meanSquaredDifference);
};

export {
    calculateMean,
    calculateMedian,
    calculateMode,
    calculateStandardDeviation
}