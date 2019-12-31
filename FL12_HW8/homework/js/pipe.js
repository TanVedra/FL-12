function addOne(x) {
    return x + 1;
}

function pipe() {
    for (let i = 1; i < arguments.length; i++) {
        arguments[0] = arguments[i](arguments[0]);
    }
    return arguments[0];
}

pipe(3, addOne, addOne, addOne, addOne, addOne, addOne, addOne);