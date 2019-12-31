function makeNumber(string) {
    let numString = '';
    string.split('').forEach(element => {
        if (!isNaN(+element)) {
            numString += element;
        }
    });
    return numString;
}

makeNumber('erer384jjjfd123');