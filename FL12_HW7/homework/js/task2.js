const gameSettings = {
    randomNum: 1,
    score: 0,
    rangeStep: 4,
    rangeEnd: 8,
    rangeStart: 0,
    gameStatus: true,
    guesses: {
        current: 3,
        general: 3
    },
    prize: [0, 25, 50, 100]
};
let message = 'Do you want to play a game?';
let userGuess = '';

while (gameSettings.gameStatus) {
    while (confirm(message)) {
        if (message === 'Do you want to play again?' && gameSettings.randomNum === parseInt(userGuess)) {
            for (let i = gameSettings.rangeStart; i < gameSettings.prize.length; i++) {
                gameSettings.prize[i] += gameSettings.prize[i];
            }
            gameSettings.rangeEnd += gameSettings.rangeStep;
        }

        gameSettings.randomNum = Math.round(Math.random() * gameSettings.rangeEnd);
        gameSettings.guesses.current = gameSettings.guesses.general;

        for (let i = gameSettings.rangeStart; i < gameSettings.guesses.current;) {
            userGuess = prompt(`
        Choose a roulette pocket number from ${gameSettings.rangeStart} to ${gameSettings.rangeEnd}
        Attempts left: ${gameSettings.guesses.current}
        Total prize: ${gameSettings.score}$
        Possible prize on current attempt: ${gameSettings.prize[gameSettings.guesses.current]}$
        `);

            if (userGuess === '' || isNaN(parseInt(userGuess)) ||
                gameSettings.rangeStart > parseInt(userGuess) || parseInt(userGuess) > gameSettings.rangeEnd) {
                alert(`You have to enter a number from ${gameSettings.rangeStart} to ${gameSettings.rangeEnd}`);
            } else if (gameSettings.randomNum === parseInt(userGuess)) {
                gameSettings.score += gameSettings.prize[gameSettings.guesses.current];
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
    if (message === `Congratulation, you won!   Your prize is: ${gameSettings.score}$. Do you want to continue?`) {
        alert(`Thank you for your participation. Your prize is: ${gameSettings.score}$.`);
        message = 'Do you want to play again?';
    } else {
        gameSettings.gameStatus = false;
    }
}

if (gameSettings.guesses.current === gameSettings.guesses.general) {
    alert('You did not become a billionaire, but can.');
}