import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'



import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     books: [],
  //     showNewBookForm: false,
  //     errMessage: ''
  //   }
  // }
  
  // componentDidMount = async () => {
  //   const config = {
  //     method: 'get', // get is the default
  //     baseURL: 'http://localhost:3001',
  //     url: '/books' // endpoint
  //   }

  //   const res = await axios(config);
  //   console.log('DATA: ', res.data);
  //   this.setState({ cats: res.data });
  // }

  

  showForm = () => this.setState({ showNewBookForm: true });
  render() {
    return (
      <>
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
          
          
          </Routes>
          <Footer />
        </Router>
        
        
      </>
    )
  }
}

export default App;
