function convert(...arr) {
    for (let id = 0; id < arr.length; id++) {
        typeof arr[id] === 'string' ? arr[id] = +arr[id] : arr[id] += '';
    }
    return arr;
}

function executeforEach(arr, func) {
    for (let id = 0; id < arr.length; id++) {
        arr[id] = func(arr[id]);
    }
}

function mapArray(arr, func) {
    for (let id = 0; id < arr.length; id++) {
        if (typeof arr[id] === 'string') {
            arr[id] = +arr[id];
        }
    }
    executeforEach(arr, func);
    return arr;
}

function filterArray(arr, func) {
    const copyArray = [...arr],
        result = [];
    executeforEach(copyArray, func);
    for (let id = 0; id < arr.length; id++) {
        if (copyArray[id]) {
            result.push(arr[id]);
        }
    }
    return result;
}

function flipOver(str) {
    let result = '';
    executeforEach(str, char => {
        result = char + result;
    });
    return result;
}

function makeListFromRange(arr) {
    const arrayLength = arr[1] - arr[0];
    for (let id = 1; id <= arrayLength; id++) {
        arr[id] = arr[0] + id;
    }
    return arr;
}

function getArrayOfKeys(arr, key) {
    const result = [];
    arr = [...arr];
    executeforEach(arr, function (obj) {
        result.push(obj[key]);
    });
    return result;
}

function substitute(arr) {
    const filterNum = 30;
    arr = [...arr];
    mapArray(arr, function (value) {
        if (value < filterNum) {
            return '*';
        } else {
            return value;
        }
    });
    return arr;
}

function getPastDay(date, days) {
    const dayInMilliseconds = 86400000;
    date = new Date(date.getTime()).getTime() - dayInMilliseconds * days;
    return new Date(date).getDate();
}

function formatDate(date) {
    let checker = 10,
        hours = date.getHours() < checker ? '0' + date.getHours() : date.getHours(),
        minutes = date.getMinutes() < checker ? '0' + date.getMinutes() : date.getMinutes(),
        seconds = date.getSeconds() < checker ? '0' + date.getSeconds() : date.getSeconds();
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${hours}:${minutes}:${seconds}`;
}