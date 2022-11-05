import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { withAuth0 } from "@auth0/auth0-react";
import Login from './Login';
import Logout from './Logout';





import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component {
  
  showForm = () => this.setState({ showNewBookForm: true });
  render() {
    return (
      <>
      {this.props.auth0.isAuthenticated ? <>
        <Router>
          <Header />
          <Routes>
            <Route 
              exact path="/"
              element={<BestBooks/>}
            >
            </Route>
            <Route
              exact path="/About"
              element={<About />}
            >
            </Route>
            
    
            <Route
              exact path="/Logout"
              element={<Logout />}
            >
            </Route>
          </Routes>
          <Footer />
        </Router>
      </>
      :
      <Login />
      }
      </>
    )
  }
}

export default withAuth0(App);
