interface ChatRoomMediator {
  showMessage(user: User, message: string);
}

// Mediator
class ChatRoom implements ChatRoomMediator {
  showMessage(user: User, message: string) {
    let time = new Date();
    let sender = user.getName();
    console.log(`${time} [ ${sender} ]: ${message}`);
  }
}

// colleagues
class User {
  protected name;
  protected chatMediator;

  constructor(name: string, chatMediator: ChatRoomMediator) {
    this.name = name;
    this.chatMediator = chatMediator;
  }

  getName() {
    return this.name;
  }

  send(message) {
    this.chatMediator.showMessage(this, message);
  }
}

let mediator = new ChatRoom();
let john = new User('John Doe', mediator);
let jane = new User('Jane Doe', mediator);

john.send('Hi there!'); // Thu Feb 14 2019 10:05:25 GMT+0800 (CST) [ John Doe ]: Hi there!
jane.send('Hey!'); // Thu Feb 14 2019 10:05:25 GMT+0800 (CST) [ Jane Doe ]: Hey!
