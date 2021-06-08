import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import User from "./pages/user";
import Post from "./pages/post";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/user/:id" component={User} />
      <Route exact path="/user/:id/:postId" component={Post} />
    </Switch>
  );
}

export default App;
