// Receiver
class Bulb {
  turnOn() {
    console.log('Bulb has been lit');
  }

  turnOff() {
    console.log('Darkness!');
  }
}

// Command接口
interface Command {
  execute();
  undo();
  redo();
}

// Command
class TurnOn implements Command {
  protected bulb;

  constructor(bulb: Bulb) {
    this.bulb = bulb;
  }

  execute() {
    this.bulb.turnOn();
  }

  undo() {
    this.bulb.turnOff();
  }

  redo() {
    this.execute();
  }
}

class TurnOff implements Command {
  protected bulb;

  constructor(bulb: Bulb) {
    this.bulb = bulb;
  }

  execute() {
    this.bulb.turnOff();
  }

  undo() {
    this.bulb.turnOn();
  }

  redo() {
    this.execute();
  }
}

// Invoker
class RemoteControl {
  submit(command: Command) {
    command.execute();
  }
}

let bulb = new Bulb();
let turnOn = new TurnOn(bulb);
let turnOff = new TurnOff(bulb);

let remote = new RemoteControl();
remote.submit(turnOn); // Bulb has been lit
remote.submit(turnOff); // Darkness!
