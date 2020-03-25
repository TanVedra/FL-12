// I know it's bad, but I tried)) It's only my first time with patterns)

class Employee {
    constructor(obj) {
        this.id = obj.id;
        this.rm_id = obj.rm_id;
        this.name = obj.name;
        this.performance = obj.performance;
        this.last_vacation_date = obj.last_vacation_date;
        this.salary = obj.salary;
    }

    showDetails() {
        return `id: ${this.id}, name: ${this.name}`;
    }
}

class RM extends Employee {
    constructor(obj) {
        super(obj);
        this.pool_name = obj.pool_name;
    }
    showDetails() {
        return `Id: ${this.id}, name: ${this.name}, pool name: ${this.pool_name}`;
    }

    showPool() {
        return `${this.pool_name}: ${this.children.length} employees`;
    }
}

class Pool {
    constructor(employees) {
        this.employees = employees;
    }

    transform(data) {
        const transformedData = [];
        data.forEach(element => {
            if (element.pool_name) {
                transformedData.push(new RM(element));
            } else {
                transformedData.push(new Employee(element));
            }
        });
        return transformedData;
    }

    lowPerformance(data) {
        return data.filter(item => item.performance === 'low');
    }

    lowSalary(data) {
        const commonSalary = data.reduce((accum, item) => accum + item.salary, 0);
        const allEmployee = data.length;
        const everageSalary = commonSalary / allEmployee;
        return data.filter(item => item.salary < everageSalary);
    }

    showWarningEmployees(data, str, key, out) {
        const list = document.createElement('ul');
        data.forEach(item => {
            const pieceOfList = document.createElement('li');
            pieceOfList.innerHTML = `<p>${item.showDetails()}, ${str}: ${item[key]}</p>`;
            list.appendChild(pieceOfList);
        });
        out.appendChild(list);
    }

    generateTree(list) {
        let map = {},
            node,
            roots = [],
            i;
        for (i = 0; i < list.length; i++) {
            map[list[i].id] = i;
            list[i].children = [];
        }
        for (i = 0; i < list.length; i++) {
            node = list[i];
            if (node.rm_id !== null) {
                list[map[node.rm_id]].children.push(node);
            } else {
                roots.push(node);
            }
        }
        return roots;
    }

    createTreeList(array, out) {
        const list = document.createElement('ul');

        array.forEach(item => {
            const pieceOfList = document.createElement('li');
            if (item.pool_name) {
                pieceOfList.innerHTML = `<p class="manager">${item.showDetails()}</p>`;
                this.createTreeList(item.children, pieceOfList);

            } else if (!item.pool_name) {
                pieceOfList.innerHTML = `<p class="developer">${item.showDetails()}</p>`;
            }
            list.appendChild(pieceOfList);
        });
        out.appendChild(list);
    }

    poolList(array, out) {
        array.forEach(item => {
            if (item.pool_name) {
                out.innerHTML += `<p>${item.showPool()}</p>`;
                this.poolList(item.children, out);
            }
        });
    }
}

const rootNode = document.querySelector('.output');
const rootNode2 = document.querySelector('.output2');
const rootNode3 = document.querySelector('.output3');
const rootNode4 = document.querySelector('.output4');
const pool = new Pool(employees);

pool.createTreeList(pool.generateTree(pool.transform(pool.employees)), rootNode);
pool.poolList(pool.generateTree(pool.transform(pool.employees)), rootNode2);
pool.showWarningEmployees(pool.lowPerformance(pool.transform(pool.employees)), `performance`, `performance`, rootNode3);
pool.showWarningEmployees(pool.lowSalary(pool.transform(pool.employees)), `low salary`, `salary`, rootNode4);