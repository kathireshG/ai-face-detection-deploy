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

// 2
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

//       const videoHeight = videoRef.current.videoHeight;
//       const videoWidth = videoRef.current.videoWidth;
//       canvasRef.current.height = videoHeight;
//       canvasRef.current.width = videoWidth;

//       canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
//         videoRef.current
//       );
//       faceapi.matchDimensions(canvasRef.current, {
//         width: videoWidth,
//         height: videoHeight,
//       });

//       const resized = faceapi.resizeResults(detections, {
//         width: videoWidth,
//         height: videoHeight,
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
//       <canvas ref={canvasRef} className="app__canvas" />
//     </div>
//   );
// }

// export default App;

import { useRef, useEffect } from "react";
import "./App.css";
import * as faceapi from "face-api.js";
import EmotionDetection from "./EmotionDetection";
import EmotionPartner from "./EmotionPartner";
import UserLogin from "./UserLogin";
import RegistrationPage from "./RegistrationPage";
import Navbar from "./navbar";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

const isUserLoggedIn = () => {
  return !!window.localStorage.getItem("username");
};

const routerDefinition = createRoutesFromElements(
  <Route>
    <Route
      path="/"
      element={
        isUserLoggedIn() ? (
          <div>
            <Navbar />

            <div className="app">
              <div className="left">
                <EmotionPartner />
              </div>
              <div className="right">
                <EmotionDetection />
              </div>
            </div>
          </div>
        ) : (
          <UserLogin />
        )
      }
    />
    <Route path="/login" element={<UserLogin />} />
    <Route path="/register" element={<RegistrationPage />} />
  </Route>
);

const router = createBrowserRouter(routerDefinition);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
