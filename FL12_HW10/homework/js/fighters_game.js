function Fighter(obj) {
    const MAX_VALUE = 100,
        MIN_VALUE = 0;
    let name = obj.name,
        damage = obj.damage,
        hp = obj.hp,
        strength = obj.strength,
        agility = obj.agility,
        wins = 0,
        losses = 0;

    this.getName = function () {
        return name;
    }
    this.getDamage = function () {
        return damage;
    }
    this.getStrength = function () {
        return strength;
    }
    this.getAgility = function () {
        return agility;
    }
    this.getHealth = function () {
        return hp;
    }
    this.logCombatHistory = function () {
        console.log(`Name: ${name}, Wins: ${wins}, Losses: ${losses}`);
    }
    this.heal = function (increaseHealth) {
        hp + increaseHealth > MAX_VALUE ? hp = MAX_VALUE : hp += increaseHealth;
    }
    this.dealDamage = function (reduceHealth) {
        hp - reduceHealth < MIN_VALUE ? hp = MIN_VALUE : hp -= reduceHealth;
    }
    this.addWin = function () {
        wins++;
    }
    this.addLoss = function () {
        losses++;
    }
    this.isAttackSuccessful = function (enemy) {
        return (enemy.getStrength() + enemy.getAgility()) / MAX_VALUE <= Math.random();
    }
    this.attack = function (enemy) {
        if (this.isAttackSuccessful(enemy)) {
            enemy.dealDamage(this.getDamage());
            console.log(`${this.getName()} makes ${this.getDamage()} damage to ${enemy.getName()}.`);
        } else {
            console.log(`${this.getName()} attack missed.`);
        }
    }
}

function battle(fighter1, fighter2) {
    if (fighter1.getHealth() && fighter2.getHealth()) {
        while (fighter1.getHealth() && fighter2.getHealth()) {
            fighter1.attack(fighter2);
            if (!fighter2.getHealth()) {
                console.log(`${fighter1.getName()} has won!`);
                fighter1.addWin();
                fighter2.addLoss();
                break;
            }
            fighter2.attack(fighter1);
            if (!fighter1.getHealth()) {
                console.log(`${fighter2.getName()} has won!`);
                fighter2.addWin();
                fighter1.addLoss();
            }
        }

    } else {
        console.log(`${fighter1.getHealth() ? fighter2.getName() : fighter1.getName()} is dead and can't fight.`);
    }
}

const fighter1 = new Fighter({
    name: 'Maximus',
    damage: 25,
    hp: 100,
    strength: 10,
    agility: 25
});

const fighter2 = new Fighter({
    name: 'Commodus',
    damage: 20,
    hp: 100,
    strength: 25,
    agility: 20
});

battle(fighter1, fighter2);
battle(fighter1, fighter2);

fighter1.logCombatHistory();
fighter2.logCombatHistory();