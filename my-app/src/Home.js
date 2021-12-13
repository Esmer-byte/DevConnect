import Axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./header";
import {Redirect} from "react-router-dom"

function Home() {
  const [ok, setOK] = useState("<div>Not authorized</div>");
  function setAuth() {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/",
    })
      .then((res) => {
        console.log(res.data.user);
        setOK(
          <div>
            <h1>Welcome {res.data.user.username}!</h1>
          </div>
        );
      })
      .catch((err) => {
        setOK(
          <Redirect to="/login" />
        );
      });
  }

  useEffect(() => {
    setAuth();
  }, []);
  return (
    <div>
      {ok}
      <Header></Header>
    </div>
  );
}

export default Home;