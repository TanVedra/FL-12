function makeNumber(string) {
    let numString = '';
    string.split('').forEach(element => {
        if (!isNaN(+element)) {
            numString += element;
        }
    });
    return numString;
}

function countNumbers(string) {
    let result = {};
    makeNumber(string).split('').forEach(element => {
        result[element] ? result[element]++ : result[element] = 1;
    });
    return result;
}

countNumbers('jdjjka000466588kkkfs662555');