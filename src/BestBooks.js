import React from 'react';
import axios from 'axios';
import Carousel from "react-bootstrap/Carousel";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      errorMessage: "",
    }
  }
  
  componentDidMount = async () => {
    try {
      const config = {
        method: "get",
        baseURL: process.env.REACT_APP_HEROKU,
        url: "/books",
      };

      const response = await axios(config);
      console.log(response.data);
      this.setState({ books: response.data });
    } catch (error) {
      console.error(error);
      this.setState({
        errorMessage: `Status Code ${error.response.status}: ${error.response.data}`,
      });
    }
  };

  render() {
  

    return (
      <Carousel>
        {this.state.books.length ? (
          this.state.books.map((book) => (
            <Carousel.Item key={book._id}>
              <img src="https://m.media-amazon.com/images/I/51DF6ZR8G7L._AC_SY780_.jpg" alt={book.title}/>
              <Carousel.Caption>
                <>
                  <p>Title: {book.title}</p>
                  <p>Description: {book.description}</p>
                  <p>Status: {book.hasRead ? 'Have read' : 'Have not read'}</p>
                </>
              </Carousel.Caption>
            </Carousel.Item>
          ))
        ) : (
          <h3>No books found! </h3>
        )}
      </Carousel>
    )
  }
}

export default BestBooks;
