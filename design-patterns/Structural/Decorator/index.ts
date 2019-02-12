interface Coffee {
  getCost();
  getDescription();
}

class SimpleCoffee implements Coffee {
  getCost() {
    return 10;
  }

  getDescription() {
    return 'Simple coffee';
  }
}

// 接下来添加decorators，允许按需修改属性
class MilkCoffee implements Coffee {
  protected coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  getCost() {
    return this.coffee.getCost() + 2;
  }

  getDescription() {
    return `${this.coffee.getDescription()}, milk`;
  }
}

class WhipCoffee implements Coffee {
  protected coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  getCost() {
    return this.coffee.getCost() + 5;
  }

  getDescription() {
    return `${this.coffee.getDescription()}, whip`;
  }
}

class VanillaCoffee implements Coffee {
  protected coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  getCost() {
    return this.coffee.getCost() + 3;
  }

  getDescription() {
    return `${this.coffee.getDescription()}, vanilla`;
  }
}

let someCoffee = new SimpleCoffee();
console.log(someCoffee.getCost()); // 10
console.log(someCoffee.getDescription()); // Simple coffee

someCoffee = new MilkCoffee(someCoffee);
console.log(someCoffee.getCost()); // 12
console.log(someCoffee.getDescription()); // Simple coffee, milk

someCoffee = new WhipCoffee(someCoffee);
console.log(someCoffee.getCost()); // 17
console.log(someCoffee.getDescription()); // Simple coffee, milk, whip

someCoffee = new VanillaCoffee(someCoffee);
console.log(someCoffee.getCost()); // 20
console.log(someCoffee.getDescription()); // Simple coffee, milk, whip, vanilla
