// Task1

class Deck {
    cards = (() => {
        let result = [];
        let suit = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 14; j++) {
                result.push(new Card(suit[i], j));
            }
        }
        return result;
    })();

    get count() {
        return this.cards.length;
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    draw(n) {
        return this.cards.splice(this.cards.length - n);
    }
}

class Card {
    static faceCards = {
        1: 'Ace',
        11: 'Jack',
        12: 'Queen',
        13: 'King'
    };

    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }

    get isFaceCard() {
        return this.rank === 1 || this.rank > 10;
    }

    toString() {
        return this.isFaceCard ? `${Card.faceCards[this.rank]} of ${this.suit}` : `${this.rank} of ${this.suit}`;
    }

    static Compare(cardOne, cardTwo) {
        return cardOne.rank === cardTwo.rank ? 0 : cardOne.rank > cardTwo.rank ? 1 : 2;
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.deck = new Deck();
    }

    get wins() {
        return this._wins || 0;
    }

    static Play(playerOne, playerTwo) {
        let message;
        playerOne._wins = 0;
        playerTwo._wins = 0;
        if (!playerOne.deck.count) playerOne.deck = new Deck();
        if (!playerTwo.deck.count) playerTwo.deck = new Deck();
        playerOne.deck.shuffle();
        playerTwo.deck.shuffle();

        while (playerOne.deck.count) {
            let result = Card.Compare(playerOne.deck.cards[playerOne.deck.cards.length - 1], playerTwo.deck.cards[playerTwo.deck.cards.length - 1]);
            if (result === 1) {
                playerOne._wins++;
                console.log(`${playerOne.name}'s ${playerOne.deck.cards[playerOne.deck.cards.length - 1].toString()} beats ${playerTwo.name}'s ${playerTwo.deck.cards[playerTwo.deck.cards.length - 1].toString()}`);
            } else if (result === 2) {
                playerTwo._wins++;
                console.log(`${playerTwo.name}'s ${playerTwo.deck.cards[playerTwo.deck.cards.length - 1].toString()} beats ${playerOne.name}'s ${playerOne.deck.cards[playerOne.deck.cards.length - 1].toString()}`);
            } else if (result === 0) {
                console.log(`${playerOne.name}'s ${playerOne.deck.cards[playerOne.deck.cards.length - 1].toString()} is equal to ${playerTwo.name}'s ${playerTwo.deck.cards[playerTwo.deck.cards.length - 1].toString()}`);
            }
            playerOne.deck.draw(1);
            playerTwo.deck.draw(1);
        }

        if (playerOne.wins !== playerTwo.wins) {
            message = `${playerOne.wins > playerTwo.wins ? playerOne.name : playerTwo.name} wins ${playerOne.wins > playerTwo.wins ? playerOne.wins : playerTwo.wins} to ${playerOne.wins < playerTwo.wins ? playerOne.wins : playerTwo.wins}`;
        } else {
            message = `
The game ended in a draw!
${playerOne.name}'s score: ${playerOne.wins}
${playerTwo.name}'s score: ${playerTwo.wins}
            `;
        }
        delete playerOne._wins;
        delete playerTwo._wins;
        console.log(message);
    }
}

let player1 = new Player('Ivan');
let player2 = new Player('Vasya');

Player.Play(player1, player2);
Player.Play(player1, player2);

// Task2

class Employee {
    static EMPLOYEES = [];
    constructor(options) {
        this.id = options.id;
        this.firstName = options.firstName;
        this.lastName = options.lastName;
        this.birthday = options.birthday;
        this.salary = options.salary;
        this.department = options.department;
        this.position = options.position;
        Employee.EMPLOYEES.push(this);
    }

    get EMPLOYEES() {
        let result = [];
        Employee.EMPLOYEES.forEach(person => {
            result.push(Object.getPrototypeOf(person).constructor.name);
        });
        return result;
    }

    get age() {
        const diff = Date.now() - new Date(this.birthday).getTime();
        return parseInt(diff / (1000 * 60 * 60 * 24 * 365));
    }

    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }

    quit() {
        Employee.EMPLOYEES.forEach((person, id, arr) => {
            if (person === this) {
                arr.splice(id, 1);
            }
        })
    }

    retire() {
        this.quit();
        this.showMessage(0);
    }

    getFired() {
        this.quit();
        this.showMessage(1);
    }

    changeDepartment(newDepartment) {
        this.department = newDepartment;
    }

    changePosition(newPosition) {
        this.position = newPosition;
    }

    changeSalary(newSalary) {
        this.salary = newSalary;
    }

    showMessage(id) {
        let messages = [
            'It was such a pleasure to work with you!',
            'Not a big deal!',
            'Yoohooo!',
            'Damn!'
        ];
        console.log(messages[id]);
    }

    getPromoted(benefits, status = true) {
        for (let key in benefits) {
            if (benefits[key]) {
                if (key === 'salary') {
                    this.changeSalary(benefits[key]);
                } else if (key === 'department') {
                    this.changeDepartment(benefits[key]);
                } else if (key === 'position') {
                    this.changePosition(benefits[key]);
                }
            }
        }
        if (status) this.showMessage(2);
    }

    getDemoted(punishment) {
        this.getPromoted(punishment, false);
        this.showMessage(3);
    }

}

class Manager extends Employee {
    constructor(options) {
        super(options);
        this.position = 'manager';
    }
    get managedEmployees() {
        let result = [];
        Employee.EMPLOYEES.forEach(person => {
            if (person.department === this.department) {
                result.push(person);
            }
        });
        return result;
    }
}

class BlueCollarWorker extends Employee { }

class HRManager extends Manager {
    constructor(options) {
        super(options);
        this.department = 'hr';
    }
}

class SalesManager extends Manager {
    constructor(options) {
        super(options);
        this.department = 'sales';
    }
}

// Personal

const salesManager = new SalesManager({
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    birthday: '10/04/1994',
    salary: 4000
});

const hrManager = new HRManager({
    id: 2,
    firstName: 'Jack',
    lastName: 'Beem',
    birthday: '12/24/1989',
    salary: 3500
});

const blueCollarWorkerOne = new BlueCollarWorker({
    id: 3,
    firstName: 'Rex',
    lastName: 'Johnson',
    birthday: '05/11/1989',
    position: 'office worker',
    department: 'sales',
    salary: 750
});

let blueCollarWorkerTwo = new BlueCollarWorker({
    id: 4,
    firstName: 'Drue',
    lastName: 'Berrimor',
    birthday: '04/30/1987',
    position: 'office worker',
    department: 'hr',
    salary: 1200
});

// Task3

function ManagerPro(person, ability) {
    if (ability === 'promoter') {
        person.promote = function (id, raiseSalary) {
            person.managedEmployees.forEach(employee => {
                if (employee.id === id) employee.getPromoted({ salary: raiseSalary });
            });
        }
    } else if (ability === 'executioner') {
        person.demote = function (id, reduceSalary) {
            person.managedEmployees.forEach(employee => {
                if (employee.id === id) employee.getDemoted({ salary: reduceSalary });
            });
        }
    }
    return person;
}

const managerProOne = ManagerPro(salesManager, 'promoter');
const managerProTwo = ManagerPro(hrManager, 'executioner');

managerProOne.promote(3, 900);
managerProTwo.demote(4, 1000);