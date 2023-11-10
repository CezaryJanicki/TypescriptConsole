const consola = require('consola');
const inquirer = require('inquirer');

enum Action {
  List = "list",
  Add = "add",
  Remove = "remove",
  Quit = "quit"
}

type InquirerAnswers = {
  action: Action
}

enum MessageVariant {
  Success = "success",
  Error = "error",
  Info = "info"
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

interface User {
  name: string;
  age: number;
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
    if (typeof user.name === "string" && user.name.length > 0 && typeof user.age === "number" && user.age > 0) {
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

const users = new UsersData();
users.showAll();
users.add({ name: "Jan", age: 20 });
users.add({ name: "Adam", age: 30 });
users.add({ name: "Kasia", age: 23 });
users.add({ name: "Basia", age: -6 });
users.showAll();
users.remove("Maurycy");
users.remove("Adam");
users.showAll();

const startApp = async () => {
  const answers: InquirerAnswers = await inquirer.prompt([{
    name: 'action',
    type: 'input',
    message: 'How can I help you?',
  }]);
  console.log("Chosen action: " + answers.action);
  startApp();
  if (answers.action === Action.Quit)
    return;
}

startApp();