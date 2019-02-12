// 当按照以下的方式接口时，会报错
// interface Employee {
//   new (name: string, salary: number): Employee;
//   getName(): string;
//   setSalary(salary: number);
//   getSalary(): number;
//   getRoles(): [];
// }
function creatEmployee(cEmp, name, salary) {
    return new cEmp(name, salary);
}
var Developer = /** @class */ (function () {
    function Developer(name, salary) {
        this.name = name;
        this.salary = salary;
    }
    Developer.prototype.getName = function () {
        return this.name;
    };
    Developer.prototype.setSalary = function (salary) {
        this.salary = salary;
    };
    Developer.prototype.getSalary = function () {
        return this.salary;
    };
    Developer.prototype.getRoles = function () {
        return this.roles;
    };
    return Developer;
}());
var Organization = /** @class */ (function () {
    function Organization() {
        this.employees = [];
    }
    Organization.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
    };
    Organization.prototype.getNetSalaries = function () {
        var netSalary = 0;
        this.employees.forEach(function (emp) {
            netSalary += emp.getSalary();
        });
        return netSalary;
    };
    return Organization;
}());
var john = creatEmployee(Developer, 'John Doe', 12000);
var jane = creatEmployee(Developer, 'Jane Doe', 15000);
var organization = new Organization();
organization.addEmployee(john);
organization.addEmployee(jane);
console.log("Net salaries: " + organization.getNetSalaries());
