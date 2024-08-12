class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (
      lowerCaseMessage.includes("interests") ||
      lowerCaseMessage.includes("interest") ||
      lowerCaseMessage.includes("interesting")
    ) {
      this.actionProvider.interest();
      console.log(window.localStorage.getItem("interests"));
    } else {
      this.actionProvider.greet(lowerCaseMessage);
    }
    // }
  }
}

export default MessageParser;
