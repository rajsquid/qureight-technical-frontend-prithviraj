import React from "react";
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListPatientComponent from "./components/ListPatient";
import AddPatientComponent from "./components/AddPatient";
import EditPatientComponent from "./components/EditPatient";


export default function App() {
  return (
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={ListPatientComponent} />
            <Route path="/patients" component={ListPatientComponent} />
            <Route path="/add-patient" component={AddPatientComponent} />
            <Route path="/edit-patient" component={EditPatientComponent} />
          </Switch>
          <Footer />
        </Router>
      </div>
  );
}