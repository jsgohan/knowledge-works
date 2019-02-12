class President {
  static instance;

  constructor() {
    // Hide the constructor
  }

  static getInstance(): President {
    if (!President.instance) {
      President.instance = new President();
    }
    return President.instance;
  }
}

let president1 = President.getInstance();
let president2 = President.getInstance();

console.log(president1 === president2); // true
