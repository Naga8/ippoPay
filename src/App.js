import React, { useEffect, useState } from "react";
import api from './api/password'
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [remaining, setRemaining] = useState(0);
  const [displayParam, setDisplayParam] = useState({
    password,
    strength: "",
    remain: 0,
  });

  useEffect(() => {
    // Password must contain at least one uppercase letter, one lowercase letter, one digit and does not contain three repeating characters in a row
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*(.)\1\1)[a-zA-Z\d]{6,}$/;
    if (remaining === 0 && regex.test(password)) {
      setDisplayParam({
        password,
        strength: "Strong",
        remain: remaining,
      });
    } else {
      setDisplayParam({
        password,
        strength: "Weak",
        remain: remaining,
      });
    }
  }, [remaining, password]);

  const handleChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length <= 20) {
      switch (e.target.value.length) {
        case 0:
          setRemaining(6);
          break;
        case 1:
          setRemaining(5);
          break;
        case 2:
          setRemaining(4);
          break;
        case 3:
          setRemaining(3);
          break;
        case 4:
          setRemaining(2);
          break;
        case 5:
          setRemaining(1);
          break;
        case 6:
          setRemaining(0);
          break;
        default:
          setRemaining(0);
      }
    }
  };

  const handleClick = async (displayParam) => {
    console.log(displayParam)
      const request = displayParam

      //To store the values in json server
      const response = await api.post('http://localhost:3001/password', request)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  };

  return (
    <div className="App">
      <h3>Password Validation </h3>
      <input
        type="text"
        name="Password"
        value={password}
        placeholder="Enter your password"
        className="password"
        onChange={handleChange}
      />
      {password.length >= 1 ? <p style={{color: "red"}}>Password must be atleast six characters <br /> mimimum characters required : {displayParam.remain}</p> : null}
      {password.length >= 1 ? <p>Password strength is {displayParam.strength}</p> : null }
      <div className="button">
      <button onClick={() => handleClick(displayParam)} disabled={password.length === 0}>
        Submit
      </button>
      </div>
    </div>
  );
}

export default App;