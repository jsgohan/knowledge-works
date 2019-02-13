class KarakTea {

}

// flyweight 用数组存储已经创建的对象，不过度创建
class TeaMaker {
  protected availableTea = [];

  make(preference) {
    if (!this.availableTea[preference]) {
      this.availableTea[preference] = new KarakTea();
    }

    return this.availableTea[preference];
  }
}

class TeaShop {
  protected orders = [];
  protected teaMaker;

  constructor(teaMaker: TeaMaker) {
    this.teaMaker = teaMaker;
  }

  takeOrder(teaType: string, table: number) {
    this.orders[table] = this.teaMaker.make(teaType);
  }

  serve() {
    this.orders.forEach((order, index) => {
      console.log(`Serving tea to table#${index}`);
    });
  }
}

let teaMaker = new TeaMaker();
let shop = new TeaShop(teaMaker);

shop.takeOrder('less sugar', 1);
shop.takeOrder('more milk', 2);
shop.takeOrder('without sugar', 5);

shop.serve();
// Serving tea to table#1
// Serving tea to table#2
// Serving tea to table#5
