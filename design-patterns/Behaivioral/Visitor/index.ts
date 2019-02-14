// Visitee
interface Animal {
  accept(operation: AnimalOperation);
}

// Visitor
interface AnimalOperation {
  visitMonkey(monkey: Monkey);
  visitLion(lion: Lion);
  visitDolphin(dolphin: Dolphin);
}

class Monkey implements Animal {
  shout() {
    console.log('Ooh oo aa aa !');
  }

  accept(operation: AnimalOperation) {
    operation.visitMonkey(this);
  }
}

class Lion implements Animal {
  shout() {
    console.log('Roaaar!');
  }

  accept(operation: AnimalOperation) {
    operation.visitLion(this);
  }
}

class Dolphin implements Animal {
  shout() {
    console.log('Tuut tuttu tuutt!');
  }

  accept(operation: AnimalOperation) {
    operation.visitDolphin(this);
  }
}

// 实现Visitor
class Speak implements AnimalOperation {
  visitMonkey(monkey: Monkey) {
    monkey.shout();
  }

  visitLion(lion: Lion) {
    lion.shout();
  }

  visitDolphin(dolphin: Dolphin) {
    dolphin.shout();
  }
}

let monkey = new Monkey();
let lion = new Lion();
let dolphin = new Dolphin();

let speak = new Speak();

monkey.accept(speak); // Ooh oo aa aa !
lion.accept(speak); // Roaaar!
dolphin.accept(speak); // Tuut tuttu tuutt!

// 现在我们可以在已有的基础上添加action，例如我们想知道每个动物的调高情况
// 可以添加一个Jump类
class Jump implements AnimalOperation {
  visitMonkey(monkey: Monkey) {
    console.log('Jumped 20 feet high! on to the tree!');
  }

  visitLion(lion: Lion) {
    console.log('Jumped 7 feet! Back on the ground');
  }

  visitDolphin(dolphin: Dolphin) {
    console.log('Walked on water a little and disappeared');
  }
}

let jump = new Jump();

monkey.accept(jump); // Jumped 20 feet high! on to the tree!
lion.accept(jump); // Jumped 7 feet! Back on the ground
dolphin.accept(jump); // Walked on water a little and disappeared
