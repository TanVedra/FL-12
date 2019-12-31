function isLeapYear(date) {
    date = new Date(date);
    if (!(date.toString() === 'Invalid Date')) {
        date = date.getFullYear();
        if (((date % 4 === 0) && (date % 100 !== 0)) || date % 400 === 0) {
            date = `${date} is a leap year`;
        } else {
            date = `${date} is not a leap year`;
        }
    } else {
        date = 'Invalid Date';
    }
    return date;
}

isLeapYear(1213131313135465656654564646542132132131);