// import React, { useState } from "react";
// import LoginPage from "./LoginPage";
// import RegistrationPage from "./RegistrationPage";

// const AuthPage = () => {
//   // Sample users
//   const sampleUsers = [
//     { username: "user1", password: "password1" },
//     { username: "user2", password: "password2" },
//   ];

//   // State to store registered users
//   const [registeredUsers, setRegisteredUsers] = useState(sampleUsers);
//   // State to store authenticated user
//   const [authenticatedUser, setAuthenticatedUser] = useState(null);
//   // State to manage authentication status
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Function to handle login
//   const handleLogin = (user) => {
//     setAuthenticatedUser(user);
//     window.localStorage.setItem("username", user.username);
//     window.location.href = "/";
//     setIsLoggedIn(true);
//   };

//   // Function to handle registration
//   const handleRegister = (newUser) => {
//     setRegisteredUsers([...registeredUsers, newUser]);
//     window.location.href = "/";
//   };

//   return (
//     <div className="auth-page">
//       {!isLoggedIn ? (
//         <>
//           <LoginPage
//             handleLogin={handleLogin}
//             registeredUsers={registeredUsers}
//           />
//           <RegistrationPage
//             handleRegister={handleRegister}
//             registeredUsers={registeredUsers}
//           />
//         </>
//       ) : (
//         <div>
//           <h2>Welcome, {authenticatedUser.username}!</h2>
//           <button onClick={() => setIsLoggedIn(false)}>Logout</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AuthPage;

import React from "react";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";

const AuthPage = () => {
  // Sample users
  const sampleUsers = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
  ];

  // State to store registered users
  const [registeredUsers, setRegisteredUsers] = React.useState(sampleUsers);
  // State to store authenticated user
  const [authenticatedUser, setAuthenticatedUser] = React.useState(null);
  // State to manage authentication status
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // Function to handle login
  const handleLogin = (user) => {
    setAuthenticatedUser(user);
    window.localStorage.setItem("username", user.username);
    setIsLoggedIn(true);
  };

  // Function to handle registration
  const handleRegister = (newUser) => {
    setRegisteredUsers([...registeredUsers, newUser]);
  };

  return (
    <div className="auth-page">
      {!isLoggedIn ? (
        <>
          <LoginPage
            handleLogin={handleLogin}
            registeredUsers={registeredUsers}
          />
          <RegistrationPage
            handleRegister={handleRegister}
            registeredUsers={registeredUsers}
          />
        </>
      ) : (
        <div>
          <h2>Welcome, {authenticatedUser.username}!</h2>
          <button onClick={() => setIsLoggedIn(false)}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
