import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Card from "./components/Cart";
import Details from "./components/Details";
import Default from "./components/Default";
import Modal from "./components/Modal";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={ProductList}></Route>
        <Route path="/details" component={Details}></Route>
        <Route path="/card" component={Card}></Route>
        <Route component={Default}></Route>
      </Switch>
      <Modal />
    </React.Fragment>
  );
}

export default App;
