// import { useRef, useEffect } from "react";
// import "./App.css";
// import * as faceapi from "face-api.js";

// function App() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     startVideo();

//     videoRef && loadModels();
//   }, []);

//   const loadModels = () => {
//     Promise.all([
//       faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
//       faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
//       faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
//       faceapi.nets.faceExpressionNet.loadFromUri("/models"),
//     ]).then(() => {
//       faceDetection();
//     });
//   };

//   const startVideo = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((currentStream) => {
//         videoRef.current.srcObject = currentStream;
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   const faceDetection = async () => {
//     setInterval(async () => {
//       const detections = await faceapi
//         .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
//         .withFaceLandmarks()
//         .withFaceExpressions();

//       canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
//         videoRef.current
//       );
//       faceapi.matchDimensions(canvasRef.current, {
//         width: 940,
//         height: 650,
//       });

//       const resized = faceapi.resizeResults(detections, {
//         width: 940,
//         height: 650,
//       });

//       faceapi.draw.drawDetections(canvasRef.current, resized);
//       faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
//       faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
//     }, 1000);
//   };

//   return (
//     <div className="app">
//       <h1> AI FACE DETECTION</h1>
//       <div className="app__video">
//         <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
//       </div>
//       <canvas
//         ref={canvasRef}
//         width="940"
//         height="650"
//         className="app__canvas"
//       />
//     </div>
//   );
// }

// export default App;

// final
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import "./style.css";

function EmotionDetection() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const emotionRef = useRef(null); // Ref for the dominant emotion h1 element
  const [apiData, setApiData] = useState("");
  const [mainemotion, setmainEmotion] = useState("");

  const genAI = new GoogleGenerativeAI(
    "AIzaSyB5iBG0-HQWO6vtSvaRTq8oTDuTi7BeNfs"
  );

  useEffect(() => {
    const prompt_for_ai = `The emotion of a person is ${mainemotion}. Give a 2 lines reply for this`;
    // fetchData(prompt_for_ai);
  }, [mainemotion]);

  const fetchData = async (inputText) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(inputText); // Pass user input to generate content
    const response = await result.response;
    const text = await response.text(); // Use await here to get the text
    setApiData(text);
  };

  useEffect(() => {
    startVideo();
    videoRef && loadModels();
  }, []);

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      faceDetection();
    });
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const faceDetection = async () => {
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      const videoHeight = videoRef.current.videoHeight;
      const videoWidth = videoRef.current.videoWidth;
      canvasRef.current.height = videoHeight;
      canvasRef.current.width = videoWidth;

      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
        videoRef.current
      );
      faceapi.matchDimensions(canvasRef.current, {
        width: videoWidth,
        height: videoHeight,
      });

      //   faceapi.matchDimensions(canvasRef.current, {
      //     width: 940,
      //     height: 650,
      //   });

      //   const resized = faceapi.resizeResults(detections, {
      //     width: 940,
      //     height: 650,
      //   });

      const resized = faceapi.resizeResults(detections, {
        width: videoWidth,
        height: videoHeight,
      });

      faceapi.draw.drawDetections(
        canvasRef.current,
        resized.map((det) => det.detection)
      );
      //   faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resized);

      // Get dominant emotion
      resized.forEach((detection) => {
        const emotions = Object.entries(detection.expressions);
        const dominantEmotion = emotions.reduce((prev, curr) =>
          curr[1] > prev[1] ? curr : prev
        )[0];
        // Update the dominant emotion text content
        emotionRef.current.textContent = `Dominant emotion: ${dominantEmotion}`;
        setmainEmotion(dominantEmotion);
      });
    }, 2000);
  };

  const image_display = () => {
    if (mainemotion === "angry") {
      return (
        <img
          src={`${process.env.PUBLIC_URL}/angry.png`}
          alt="Angry"
          className="emotion-image"
        />
      );
    } else if (mainemotion === "sad") {
      return (
        <img
          src={`${process.env.PUBLIC_URL}/sad.png`}
          alt="Sad"
          className="emotion-image"
        />
      );
    } else if (mainemotion === "happy") {
      return (
        <img
          src={`${process.env.PUBLIC_URL}/happy.png`}
          alt="Happy"
          className="emotion-image"
        />
      );
    } else if (mainemotion === "surprised") {
      return (
        <img
          src={`${process.env.PUBLIC_URL}/surprised.png`}
          alt="surprised"
          className="emotion-image"
        />
      );
    } else if (mainemotion === "confused") {
      return (
        <img
          src={`${process.env.PUBLIC_URL}/confused.png`}
          alt="confused"
          className="emotion-image"
        />
      );
    } else if (mainemotion === "fearful") {
      return (
        <img
          src={`${process.env.PUBLIC_URL}/afraid.png`}
          alt="afraid"
          className="emotion-image"
        />
      );
    } else if (mainemotion === "disgusted") {
      return (
        <img
          src={`${process.env.PUBLIC_URL}/disgusted.png`}
          alt="disgusted"
          className="emotion-image"
        />
      );
    } else if (mainemotion === "neutral") {
      return (
        <img
          src={`${process.env.PUBLIC_URL}/neutral.png`}
          alt="neutral"
          className="emotion-image"
        />
      );
    } else {
      return null; // If no emotion detected, return null or display a default image
    }
  };

  return (
    <div className="video-content">
      <div className="app__video">
        <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
      </div>
      <canvas ref={canvasRef} className="app__canvas" />
      <h1 ref={emotionRef} className="app__emotion"></h1>
      {image_display()}
    </div>
  );
}

export default EmotionDetection;
