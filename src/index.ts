const consola = require('consola');
const inquirer = require('inquirer');

enum MessageVariant {
  Success = "success",
  Error = "error",
  Info = "info"
}

interface User {
  name: string;
  age: number;
}

class Message {

  constructor(public content: string) { }

  public show() {
      console.log(this.content);
  }
  public capitalize() {
    this.content = this.content.toUpperCase();
  }
  public toUpperCase() {
    this.content = this.content.toUpperCase();
  }
  public toLowerCase() {
    this.content = this.content.toLowerCase();
  }
  public static showColorized(type: MessageVariant, content: string) {
    if (type === MessageVariant.Error) {
      consola.error(content);
    } else if (type === MessageVariant.Success) {
      consola.success(content);
    } else {
      consola.info(content);
    }
  }
}

class UsersData {
  data: User[] = [];

  showAll() {
    Message.showColorized(MessageVariant.Info, "Users data");
    if (this.data.length === 0) {
      Message.showColorized(MessageVariant.Info, "No data...");
    } else {
      console.table(this.data);
    }
  }

  public add(user: User) {
    if (user.name.length > 0 && user.age > 0) {
      this.data.push(user);
      Message.showColorized(MessageVariant.Success, "User has been successfully added!");
    } else {
      Message.showColorized(MessageVariant.Error, "Wrong data!");
    }
  }

  public remove(name: string) {
    const index = this.data.findIndex((user) => user.name === name);
    if (index > -1) {
      this.data.splice(index, 1);
      Message.showColorized(MessageVariant.Success, "User deleted!");
    } else {
      Message.showColorized(MessageVariant.Error, "User not found...");
    }
  }
}

const startApp = () => {
  enum Action {
    List = "list",
    Add = "add",
    Remove = "remove",
    Quit = "quit"
  }

  type InquirerAnswers = {
    action: Action
  }

  inquirer.prompt([{
    name: 'action',
    type: 'input',
    message: 'How can I help you?',
  }]).then(async (answers: InquirerAnswers) => {
    console.log("loggin" + answers.action);
    switch (answers.action) {
      case Action.List:
        users.showAll();
        break;
      case Action.Add:
        const user = await inquirer.prompt([{
          name: 'name',
          type: 'input',
          message: 'Enter name',
        }, {
          name: 'age',
          type: 'number',
          message: 'Enter age',
        }]);
        if (users.data.find((u) => u.name === user.name)) {
          Message.showColorized(MessageVariant.Error, "User already exists!");
          break;
        }
        users.add(user);
        break;
      case Action.Remove:
        const name = await inquirer.prompt([{
          name: 'name',
          type: 'input',
          message: 'Enter name',
        }]);
        users.remove(name.name);
        break;
      case Action.Quit:
        Message.showColorized(MessageVariant.Info, "Bye bye!");
        return;
      default:
        Message.showColorized(MessageVariant.Error, "Wrong action!");
        break;
    }
    startApp();
  });
}

const users = new UsersData();
console.log("\n");
console.info("???? Welcome to the UsersApp!");
console.log("====================================");
Message.showColorized(MessageVariant.Info, "Available actions");
console.log("\n");
console.log("list – show all users");
console.log("add – add new user to the list");
console.log("remove – remove user from the list");
console.log("quit – quit the app");
console.log("\n");

startApp();