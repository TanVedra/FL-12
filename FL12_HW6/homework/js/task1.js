let a = parseFloat(prompt("Enter 'a':")),
    b = parseFloat(prompt("Enter 'b':")),
    c = parseFloat(prompt("Enter 'c':"));

if (a === 0 || isNaN(a) || isNaN(b) || isNaN(c)) {
    console.log('Invalid input data');
} else {
    let num4 = 4,
        d = b * b - num4 * a * c;
    if (d > 0) {
        let x1 = -(b + Math.sqrt(d)) / (a + a),
            x2 = -(b - Math.sqrt(d)) / (a + a);
        console.log('x1 = ' + x1);
        console.log('x2 = ' + x2);
    } else if (d === 0) {
        let x = -b / (a + a);
        console.log('x = ' + x);
    } else {
        console.log('No solution');
    }
}