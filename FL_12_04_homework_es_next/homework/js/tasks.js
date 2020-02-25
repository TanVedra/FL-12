///////////// Task1

const array = [1, 2, 3, 4, 56, 7, 8, 76, 5, 241, 5, 356, 567, 2];

function maxElement(arr) {
    return Math.max(...arr);
}
// console.log(maxElement(array));

///////////// Task2

function copyArray(arr) {
    return [...arr];
}

const copiedArray = copyArray(array);

// console.log(array, copiedArray);
// console.log(array === copiedArray);

///////////// Task3

function addUniqueId(obj) {
    let newObj = { ...obj };
    newObj.id = Symbol();
    return newObj;
}

const obj1 = { name: 'Vasyok', speciality: 'gopnik', rank: 'matyorui' };
const obj2 = addUniqueId(obj1);

// console.log(obj1 === obj2);

///////////// Task4

function regroupObject(obj) {
    delete Object.assign(obj, { user: obj.details }).details;
    delete Object.assign(obj, { university: obj.user.university }).user.university;
    Object.assign(obj.user, { firstName: obj.name });
    delete obj.name;
    return obj;
}
// const oldObj = { name: 'Someone', details: { id: 1, age: 11, university: 'UNI' } };
// console.log(regroupObject(oldObj));

///////////// Task5

function findUniqueElements(arr) {
    return Array.from(new Set(arr));
}

// const arrayTask5 = [1, 1, 23, 3, 4, 5, 6, 5, 4, 23, 2, 1, 1, 1, 1, 1];
// console.log(findUniqueElements(arrayTask5));

///////////// Task6

function hideNumber(str) {
    return str.substring(str.length - 4).padStart(str.length, '*');
}

// const phone = '0123456789';
// console.log(hideNumber(phone));

///////////// Task7

function add(numA, numB) {
    if (arguments.length < 2) {
        throw new Error('Missing property');
    } else {
        return numA + numB;
    }
}

// console.log(add(1, 3));
// add(2);

///////////// Task8

function users(url) {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            sortResponse(json);
            showUsersNames(json);
        })
}

function sortResponse(data) {
    data.sort((valueOne, valueTwo) => {
        return valueOne.name < valueTwo.name ? -1 : 1;
    });
}

function showUsersNames(data) {
    data.forEach(person => console.log(person.name));
}

// users('https://jsonplaceholder.typicode.com/users');

///////////// Task9

async function repositories(userName) {
    let gitHubResponse = await fetch(`https://api.github.com/users/${userName}/repos`);
    let gitHubUserRepos = await gitHubResponse.json();
    sortResponse(gitHubUserRepos);
    showUsersNames(gitHubUserRepos);
}

// repositories('tanvedra');