// Door interface and implements for it
interface Door {
  getDescription();
}

class WoodenDoor implements Door {
  getDescription() {
    console.log('I am a wooden door');
  }
}

class IronDoor implements Door {
  getDescription() {
    console.log('I am an iron door');
  }
}

// fitting experts for each door type
interface DoorFittingExpert {
  getDescription();
}

class Welder implements DoorFittingExpert {
  getDescription() {
    console.log('I can only fit iron doors');
  }
}

class Carpenter implements DoorFittingExpert {
  getDescription() {
    console.log('I can only fit wooden doors');
  }
}

// abstract factory
interface DoorFactory {
  makeDoor(): Door;
  mekeFittingExpert(): DoorFittingExpert;
}

class WoodenDoorFactory implements DoorFactory {
  makeDoor(): Door {
    return new WoodenDoor();
  }
  
  mekeFittingExpert(): DoorFittingExpert {
    return new Carpenter();
  }
}

class IronDoorFactory implements DoorFactory {
  makeDoor(): Door {
    return new IronDoor();
  }

  mekeFittingExpert(): DoorFittingExpert {
    return new Welder();
  }
}

let woodenFactory = new WoodenDoorFactory();
let door = woodenFactory.makeDoor();
let expert = woodenFactory.mekeFittingExpert();
door.getDescription(); // I am a wooden door
expert.getDescription(); // I can only fit wooden doors

let ironFactory = new IronDoorFactory();
let ironDoor = ironFactory.makeDoor();
let ironExpert = ironFactory.mekeFittingExpert();
ironDoor.getDescription(); // I am an iron door
ironExpert.getDescription(); // I can only fit iron doors
