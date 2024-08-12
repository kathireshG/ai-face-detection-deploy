import { GoogleGenerativeAI } from "@google/generative-ai";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  async greet(inputText) {
    // Make the function asynchronous
    const genAI = new GoogleGenerativeAI(
      "AIzaSyB5iBG0-HQWO6vtSvaRTq8oTDuTi7BeNfs"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    // const result = await model.generateContent(
    //   `${inputText}. reply like a emotional support partner in 2 lines`
    // ); // Pass user input to generate content
    const result = await model.generateContent(`${inputText}.`); // Pass user input to generate content
    const response = await result.response;
    const text = await response.text(); // Use await here to get the text
    const greetingMessage = this.createChatBotMessage(text);
    this.updateChatbotState(greetingMessage);
  }

  async interest() {
    // Make the function asynchronous
    const genAI = new GoogleGenerativeAI(
      "AIzaSyB5iBG0-HQWO6vtSvaRTq8oTDuTi7BeNfs"
    );

    const interest__ = window.localStorage.getItem("interests");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(
      ` My interests are these ${interest__}. reply like a emotional support partner. For example tell some interesting fact about my interest or give me someting related to my interest. give without any formatting`
    );
    const response = await result.response;
    const text = await response.text(); // Use await here to get the text
    const greetingMessage = this.createChatBotMessage(text);
    this.updateChatbotState(greetingMessage);
  }

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
