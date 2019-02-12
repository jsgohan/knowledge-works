// 当按照以下的方式接口时，会报错
// interface Employee {
//   new (name: string, salary: number): Employee;
//   getName(): string;
//   setSalary(salary: number);
//   getSalary(): number;
//   getRoles(): [];
// }

// 原因是当一个类实现了一个接口时，只对其实例部分进行类型检查。constructor存在于类的静态部分，所以不再检查的范围内
// 因此应该直接操作类的静态部分 将构造函数和实例方法拆成两个接口是个不错的选择
interface EmployeeConstructor {
  new (name: string, salary: number): Employee;
}

interface Employee {
  getName(): string;
  setSalary(salary: number);
  getSalary(): number;
  getRoles(): [];
}

function creatEmployee(cEmp: EmployeeConstructor, name: string, salary: number): Employee {
  return new cEmp(name, salary);
}

class Developer implements Employee {
  protected salary;
  protected name;
  protected roles;

  constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }

  getName(): string {
    return this.name;
  }

  setSalary(salary: number) {
    this.salary = salary;
  }

  getSalary(): number {
    return this.salary;
  }

  getRoles(): [] {
    return this.roles;
  }
}

class Organization {
  protected employees: Employee[] = [];

  addEmployee(employee: Employee) {
    this.employees.push(employee);
  }

  getNetSalaries(): number {
    let netSalary = 0;

    this.employees.forEach(emp => {
      netSalary += emp.getSalary();
    });

    return netSalary;
  }
}

let john = creatEmployee(Developer, 'John Doe', 12000);
let jane = creatEmployee(Developer, 'Jane Doe', 15000);

let organization = new Organization();
organization.addEmployee(john);
organization.addEmployee(jane);

console.log(`Net salaries: ${organization.getNetSalaries()}`); // Net salaries: 27000
