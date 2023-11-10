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

//create enum for consola success, error and info
enum MessageVariant {
  Success = "success",
  Error = "error",
  Info = "info"
}

//create Message class
class Message {
  constructor(public content: string) { }

  public show() {
    //log contenst of text
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
  const msg = new Message("heLlo world!");
  msg.show(); // "heLlo world!"
  msg.capitalize();
  msg.show(); // "Hello world!"
  msg.toLowerCase();
  msg.show(); // "hello world!"
  msg.toUpperCase();
  msg.show(); // "HELLO WORLD!"
  Message.showColorized(MessageVariant.Success, "Test"); // √ "Test"
  Message.showColorized(MessageVariant.Error, "Test 2"); // "x Test 2"
  Message.showColorized(MessageVariant.Info, "Test 3"); // ℹ "Test 3"

//add async before collback function
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