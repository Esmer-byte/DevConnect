import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/UserProfile";
import Update from "./components/Update";
import bgcolor from "./styles/bgcolor";

function App() {
  return (
    
     <div>
      <Route backgroundColor="black" exact path="/">
        <Home backgroundColor="black" />
      </Route >
      <Route backgroundColor="black" path="/profile/:id">
        <Profile backgroundColor="black" />
      </Route>
      <Route backgroundColor="black" path="/login">
        <Login backgroundColor="black" />
      </Route>
      <Route backgroundColor="black" path="/register">
        <Register backgroundColor="black" />
      </Route>
      <Route backgroundColor="black" path="/update">
        <Update backgroundColor="black" />
      </Route>
      </div>
    
  );
}

export default App;
