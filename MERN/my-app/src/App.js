import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/UserProfile";
import Update from "./components/Update";

function App() {
  return (
    <div>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/profile">
        <Profile/>
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/update">
        <Update/>
      </Route>
    </div>
  );
}

export default App;
