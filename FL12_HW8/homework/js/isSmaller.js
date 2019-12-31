function isBigger(numA, numB) {
    return numA > numB;
}

function isSmaller(numA, numB) {
    return !isBigger(numA, numB);
}

isSmaller(5, -1);