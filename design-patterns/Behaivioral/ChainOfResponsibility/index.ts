abstract class Account {
  protected successor;
  protected balance;

  // 设置责任链对象
  setNext(account: Account) {
    this.successor = account;
  }

  pay(amountToPay: number) {
    if (this.canPay(amountToPay)) {
      console.log(`Paid ${amountToPay} by ${this.name}`);
    } else if (this.successor) {
      this.successor.pay(amountToPay);
    } else {
      console.error('None of the accounts have enough balance');
    }
  }

  canPay(amount): boolean {
    return this.balance >= amount;
  }
}

class Bank extends Account {
  protected balance;
  name = 'Bank';

  constructor(balance: number) {
    super();
    this.balance = balance;
  }
}

class Paypal extends Account {
  protected balance;
  name = 'Paypal';

  constructor(balance: number) {
    super();
    this.balance = balance;
  }
}

class Bitcoin extends Account {
  protected balance;
  name = 'Bitcoin';

  constructor(balance: number) {
    super();
    this.balance = balance;
  }
}

// 自定义责任链，链式顺序为bank -> paypal -> bitcoin
let bank = new Bank(100);
let paypal = new Paypal(200);
let bitcoin = new Bitcoin(300);

bank.setNext(paypal);
paypal.setNext(bitcoin);

bank.pay(218); // Paid 218 by Bitcoin
