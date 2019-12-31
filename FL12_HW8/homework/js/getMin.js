function getMin() {
    let minNum = 0;
    for (let i = 0; i < arguments.length; i++) {
        if (minNum > arguments[i]) {
            minNum = arguments[i];
        }
    }
    return minNum;
}

getMin(-1, -2, -3, -4, -5, -6, 7, 12, 27, -12, 100, 37, -12, 45, -7, 95, -45);