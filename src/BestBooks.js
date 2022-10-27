import React from 'react';
import axios from 'axios';
import Carousel from "react-bootstrap/Carousel";
import Button from 'react-bootstrap/Button';
import CreateBookForm from './CreateBookForm';

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
  handleCreateBook = async (bookToBeCreated) => {
    try {
      const config = {
        method: 'post',
        baseURL: process.env.REACT_APP_HEROKU,
        url: '/books',
        data: bookToBeCreated
      }

      const res = await axios(config);
      this.setState({ books: [...this.state.books, res.data] });
    } catch(err) {
      console.error('Error is in the App.js in the createBook Function: ', err);
      this.setState({ errMessage: `Status Code ${err.res.status}: ${err.res.data}`});
    }
  }

  handleDeleteBook = async (bookToBeDeleted) => {
    try {
      const proceed = window.confirm(`Do you wish to delete ${bookToBeDeleted.title}?`);

      if (proceed) {
        const config = {
          method: 'delete',
          baseURL: process.env.REACT_APP_HEROKU,
          url: `/books/${bookToBeDeleted._id}`
        }

        const res = await axios(config);
        console.log(res.data);
        const newBooksArr = this.state.books.filter(book => book._id !== bookToBeDeleted._id);
        this.setState({ books: newBooksArr });
      }
    } catch(err) {
      console.error('Error is in the App.js in the deleteBook Function: ', err);
      // axios sends more info about the error in a response object on the error
      this.setState({ errMessage: `Status Code ${err.res.status}: ${err.res.data}`});
    }
  }
  render() {
  

    return (
      <>
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
                  <Button onClick={() => this.handleDeleteBook(book)}>Delete this book!</Button>
                </>
              </Carousel.Caption>
            </Carousel.Item>
          ))
        ) : (
          <h3>No books found! </h3>
        )}
      </Carousel>
      <CreateBookForm handleCreateBook={this.handleCreateBook}/>
      </>
    )
  }
}

export default BestBooks;
