class Burger {
  protected size;
  protected cheese = false;
  protected pepperoni = false;
  protected lettuce = false;
  protected tomato = false;

  constructor(builder: BurgerBuilder) {
    this.size = builder.size;
    this.cheese = builder.cheese;
    this.pepperoni = builder.pepperoni;
    this.lettuce = builder.lettuce;
    this.tomato = builder.tomato;
  }

  run() {
    console.log(`size: ${this.size}
    cheese: ${this.cheese}
    pepperoni: ${this.pepperoni}
    lettuce: ${this.lettuce}
    tomato: ${this.tomato}`);
  }
}

class BurgerBuilder {
  size;
  cheese = false;
  pepperoni = false;
  lettuce = false;
  tomato = false;

  constructor(size: number) {
    this.size = size;
  }

  addPepperoni() {
    this.pepperoni = true;
    return this;
  }

  addLettuce() {
    this.lettuce = true;
    return this;
  }

  addCheese() {
    this.cheese = true;
    return this;
  }

  addTomato() {
    this.tomato = true;
    return this;
  }

  build(): Burger {
    return new Burger(this);
  }
}

let burger = (new BurgerBuilder(14))
  .addPepperoni()
  .addLettuce()
  .addTomato()
  .build();

burger.run();
// size: 14
// cheese: false
// pepperoni: true
// lettuce: true
// tomato: true
