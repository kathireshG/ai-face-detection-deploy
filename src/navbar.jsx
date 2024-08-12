import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1
        onClick={() => {
          window.location.href = "/";
        }}
        style={{
          // fontSize: "25px",
          marginTop: "9px",
          // textAlign: "right",
          // position: "absolute",
          // right: "11%",
        }}
        className="logo"
      >
        Emotion Partner
      </h1>
      <h2
        style={{
          fontSize: "25px",
          marginTop: "10px",
          textAlign: "right",
          position: "absolute",
          right: "11%",
        }}
      >
        Username: {window.localStorage.getItem("username")}
      </h2>
      <div>
        {/* <button
          onClick={() => {
            window.location.href = "/new";
          }}
        >
          Register New Vehicle
        </button> */}

        <button
          onClick={() => {
            window.localStorage.removeItem("username");
            window.localStorage.removeItem("interests");
            window.location.href = "/login";
          }}
          className="logoutbutton"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
