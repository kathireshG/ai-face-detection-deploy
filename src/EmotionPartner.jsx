// import React, { useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// function EmotionPartner() {
//   const [prompt, setPrompt] = useState("");
//   const [apiData, setApiData] = useState("");
//   const genAI = new GoogleGenerativeAI(
//     "AIzaSyB5iBG0-HQWO6vtSvaRTq8oTDuTi7BeNfs"
//   );

//   const fetchData = async () => {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const prompt = "Hello";
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     console.log(text);
//     setApiData(text);
//   };

//   return (
//     <div>
//       <h1 className="main-title">Emotion Partner</h1>
//       <button onClick={fetchData}>Click to Generate Response</button>
//       <input type="text" />
//     </div>
//   );
// }

// export default EmotionPartner;

//final

// import React, { useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// function EmotionPartner() {
//   const [inputText, setInputText] = useState(""); // State to hold user input
//   const [apiData, setApiData] = useState("");
//   const genAI = new GoogleGenerativeAI(
//     "AIzaSyB5iBG0-HQWO6vtSvaRTq8oTDuTi7BeNfs"
//   );

//   const fetchData = async () => {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const result = await model.generateContent(inputText); // Pass user input to generate content
//     const response = await result.response;
//     const text = await response.text(); // Use await here to get the text
//     setApiData(text);
//   };

//   return (
//     <div>
//       <h1 className="main-title">Emotion Partner</h1>
//       <input
//         type="text"
//         value={inputText}
//         onChange={(e) => setInputText(e.target.value)} // Update inputText state as user types
//       />
//       <button onClick={fetchData}>Click to Generate Response</button>
//       <p>{apiData}</p> {/* Display the generated response here */}
//     </div>
//   );
// }

// export default EmotionPartner;

// // I am sad. reply like a emotional support partner

//react-chatbot1
// import React, { useState } from "react";
// import ChatBot from "react-simple-chatbot";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// function EmotionPartner() {
//   const [chatHistory, setChatHistory] = useState([]);
//   const genAI = new GoogleGenerativeAI(
//     "AIzaSyB5iBG0-HQWO6vtSvaRTq8oTDuTi7BeNfs"
//   );

//   const handleEnd = (value) => {
//     const chat = {
//       user: value.user,
//       bot: value.steps[1].message.message,
//     };
//     setChatHistory([...chatHistory, chat]);
//   };

//   const fetchData = async (inputText) => {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const result = await model.generateContent(
//       `${inputText}. reply like a emotional support partner in 2 lines`
//     ); // Pass user input to generate content
//     const response = await result.response;
//     const text = await response.text(); // Use await here to get the text
//     // const data = await response.json();
//     return text; // Assuming the response structure has a 'message' field
//   };

//   const BotResponse = (props) => {
//     const { steps, triggerNextStep } = props;
//     const inputText = steps.user.value;

//     fetchData(inputText).then((response) => {
//       const chat = {
//         user: inputText,
//         bot: response,
//       };
//       setChatHistory([...chatHistory, chat]);
//       triggerNextStep();
//     });

//     return <></>; // Return an empty fragment to render nothing immediately
//   };

//   const steps = [
//     {
//       id: "0",
//       message: "Welcome to Emotion Partner! How can I assist you today?",
//       trigger: "user",
//     },
//     {
//       id: "user",
//       user: true,
//       trigger: "botResponse",
//     },
//     {
//       id: "botResponse",
//       component: <BotResponse />,
//       waitAction: true,
//     },
//   ];

//   return (
//     <div>
//       <h1 className="main-title">Emotion Partner</h1>
//       <div className="chat-history">
//         {chatHistory.map((chat, index) => (
//           <div key={index}>
//             <p className="user-message">{chat.user}</p>
//             <p className="bot-message">{chat.bot}</p>
//           </div>
//         ))}
//       </div>
//       <ChatBot
//         steps={steps}
//         handleEnd={handleEnd}
//         hideHeader={true}
//         hideSubmitButton={true}
//       />
//     </div>
//   );
// }

// export default EmotionPartner;

//react-chatbot 2

import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import config from "./config";
// import "react-chatbot-kit/build/main.css";
import "./style.css";
function EmotionPartner() {
  const [chatHistory, setChatHistory] = useState([]);
  const genAI = new GoogleGenerativeAI(
    "AIzaSyB5iBG0-HQWO6vtSvaRTq8oTDuTi7BeNfs"
  );

  const fetchData = async (inputText) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(
      `${inputText}. reply like a emotional support partner in 2 lines`
    ); // Pass user input to generate content
    const response = await result.response;
    const text = await response.text(); // Use await here to get the text
    return text; // Assuming the response structure has a 'message' field
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 className="main-title">Chat Bot</h1>
      <Chatbot
        className="chatbot_"
        config={config}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
      />
    </div>
  );
}

export default EmotionPartner;
