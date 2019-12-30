const gameSettings = {
    randomNum: 1,
    score: 0,
    rangeStep: 4,
    rangeStart: 0,
    rangeEnd: {
        current: 8,
        start: 8
    },
    guesses: {
        current: 3,
        start: 3
    },
    prizeStart: {
        0: 0,
        1: 25,
        2: 50,
        3: 100
    },
    prizeCurrent: {
        0: 0,
        1: 25,
        2: 50,
        3: 100
    }
};
let message = 'Do you want to play a game?';
let userGuess = '';

while (confirm(message)) {
    if (gameSettings.randomNum === parseInt(userGuess)) {
        for (let key in gameSettings.prizeCurrent) {
            gameSettings.prizeCurrent[key] += gameSettings.prizeCurrent[key];
        }
        gameSettings.rangeEnd.current += gameSettings.rangeStep;
    } else {
        for (let key in gameSettings.prizeCurrent) {
            gameSettings.prizeCurrent[key] = gameSettings.prizeStart[key];
        }
        gameSettings.rangeEnd.current = gameSettings.rangeEnd.start;
        gameSettings.score = gameSettings.rangeStart;
    }

    gameSettings.randomNum = Math.round(Math.random() * gameSettings.rangeEnd.current);
    gameSettings.guesses.current = gameSettings.guesses.start;

    for (let i = gameSettings.rangeStart; i < gameSettings.guesses.current;) {
        userGuess = prompt(`
        Choose a roulette pocket number from ${gameSettings.rangeStart} to ${gameSettings.rangeEnd.current}
        Attempts left: ${gameSettings.guesses.current}
        Total prize: ${gameSettings.score}$
        Possible prize on current attempt: ${gameSettings.prizeCurrent[gameSettings.guesses.current]}$
        `);

        if (userGuess === '' || isNaN(parseInt(userGuess)) ||
            gameSettings.rangeStart > parseInt(userGuess) || parseInt(userGuess) > gameSettings.rangeEnd.current) {
            alert(`You have to enter a number from ${gameSettings.rangeStart} to ${gameSettings.rangeEnd.current}`);
        } else if (gameSettings.randomNum === parseInt(userGuess)) {
            gameSettings.score += gameSettings.prizeCurrent[gameSettings.guesses.current];
            message = `Congratulation, you won!   Your prize is: ${gameSettings.score}$. Do you want to continue?`;
            gameSettings.guesses.current = gameSettings.rangeStart;
        } else {
            gameSettings.guesses.current--;
            if (gameSettings.guesses.current === gameSettings.rangeStart) {
                alert(`Thank you for your participation. Your prize is: ${gameSettings.score}$.`);
                message = 'Do you want to play again?';
            }
        }
    }
}

if (gameSettings.guesses.current === gameSettings.guesses.start) {
    alert('You did not become a billionaire, but can.');
}