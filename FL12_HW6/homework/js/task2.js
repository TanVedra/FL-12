let a = prompt('Enter "a":'),
    b = prompt('Enter "b":'),
    c = prompt('Enter "c":');

if (a === '' || b === '' || c === '' || a === null || b === null || c === null) {
    console.log('input values should be ONLY numbers');
} else {
    a = parseInt(a);
    b = parseInt(b);
    c = parseInt(c);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        console.log('input values should be ONLY numbers');
    } else {
        if (a <= 0 || b <= 0 || c <= 0) {
            console.log('A triangle must have 3 sides with a positive definite length');
        } else {
            if (a + b <= c || a + c <= b || b + c <= a) {
                console.log('Triangle doesn’t exist');
            } else {
                if (a === b || b === c || c === a) {
                    if (a === b && b === c) {
                        console.log('Equilateral triangle');
                    } else {
                        console.log('Isosceles triangle');
                    }
                } else {
                    console.log('Scalene triangle');
                }
            }
        }
    }
}