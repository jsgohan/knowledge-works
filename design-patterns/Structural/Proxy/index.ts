interface Door {
  open();
  close();
}

class LabDoor implements Door {
  open() {
    console.log('Opening lab door');
  }

  close() {
    console.log('closing the lab door');
  }
}

// 创建proxy
class SecureDoor {
  protected door;

  constructor(door: Door) {
    this.door = door;
  }

  open(password) {
    if (this.authenticate(password)) {
      this.door.open();
    } else {
      console.log('Big no ! It ain\'t possible.');
    }
  }

  authenticate(password) {
    return password === '$ecr@t';
  }

  close() {
    this.door.close();
  }
}

let door = new SecureDoor(new LabDoor());
door.open('invalid'); // Big no ! It ain't possible.
door.open('$ecr@t'); // Opening lab door
door.close(); // closing the lab door
