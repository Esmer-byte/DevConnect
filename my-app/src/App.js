import "./App.css";
import axios from "axios";
import React, { useState } from "react";

function App() {

const[enteredUsername, setEnteredUsername] = useState("");
const[enteredPassword, setEnteredPassword] = useState("");

function usernameHandler(event) {
  setEnteredUsername(event.target.value);
}
function passwordHandler(event) {
  setEnteredPassword(event.target.value);
}


function handleSubmit(event) {
  event.preventDefault();
  const formData = {
    username: enteredUsername,
    password: enteredPassword
  };
  console.log(formData);
  axios.post("/createUser", {username:formData.username,password:formData.password},{withCredentials:true}).then(console.log("Succes!")).catch(err => console.error(err));


}



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange = {usernameHandler} value={enteredUsername} placeholder="username"></input>
        <input type="password" onChange = {passwordHandler} value={enteredPassword} placeholder="password"></input>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;