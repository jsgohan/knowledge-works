interface Door {
  getWidth();
  getHeight();
}

class WoodenDoor implements Door {
  protected width;
  protected height;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }
}

class DoorFactory {
  static makeDoor(width, height) {
    return new WoodenDoor(width, height);
  }
}

const door = DoorFactory.makeDoor(100, 200);
door.getWidth();
door.getHeight();
