interface Lion {
  roar();
}

class AfricanLion implements Lion {
  roar() {}
}

class AsianLion implements Lion {
  roar() {}
}

class Hunter {
  hunt(lion: Lion) {
    lion.roar();
  }
}

// 在现有的基础上，添加WildDog类，但dog准确上说是属于不同的接口
// 为了适配现有的hunter，要创建一个适配器来兼容
class WildDog {
  bark() {
    console.log('bark~');
  }
}

// 适配WildDog让其兼容
class WildDogAdapter implements Lion {
  protected dog;

  constructor(dog: WildDog) {
    this.dog = dog;
  }

  roar() {
    this.dog.bark();
  }
}

// 现在WildDog就可以使用WildDogAdapter类适配规则
let wildDog = new WildDog();
let wildDogAdapter = new WildDogAdapter(wildDog);

let hunter = new Hunter();
hunter.hunt(wildDogAdapter); // bark~
