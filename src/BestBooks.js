import React from 'react';
import axios from 'axios';
import Carousel from "react-bootstrap/Carousel";
import Button from 'react-bootstrap/Button';
import CreateBookForm from './CreateBookForm';
import UpdateBookForm from './UpdateBookForm';
import { withAuth0 } from '@auth0/auth0-react';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      errorMessage: "",
      showNewBookForm: false,
      selectedBook: {},
      show: false
    }
  }
  
  componentDidMount = async () => {
    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
  
        console.log('token: ', jwt);
  
        const config = {
          headers: { "Authorization": `Bearer ${jwt}` }, // new lab 15
          method: 'get',
          baseURL: process.env.REACT_APP_HEROKU,
          url: '/books'
        }
  
        const booksResponse = await axios(config);
  
        console.log("Books from DB: ", booksResponse.data);
        
        this.setState({ books: booksResponse.data });
    }} catch (error) {
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
  handleUpdateBook = async (bookToBeUpdated) => {
    console.log(bookToBeUpdated)
    try {
        const config = {
          method: 'put',
          baseURL: process.env.REACT_APP_HEROKU,
          url: `/books/${bookToBeUpdated._id}`
        }

        const res = await axios(config);
        console.log(res.data);
        const updatedBooks = this.state.books.map(preExistingBook => {
          if (preExistingBook._id === bookToBeUpdated._id) {
            return bookToBeUpdated;
          } else {
            return preExistingBook;
          }
        })
        this.setState({ books: updatedBooks });
    } catch(err) {
      console.error('Error is in the BestBooks.js in the handleUpdateBook Function: ', err);
      this.setState({ errorMessage: `Status Code ${err.res.status}: ${err.res.data}`});
    }
  }
  showForm = () => this.setState({ showNewBookForm: true });
  handleSelectBook = (bookToBeSelected) => this.setState({ selectedBook: bookToBeSelected, show: true });
  handleOnHide = () => this.setState({ selectedBook: {}, show: false });
  handleClose = () => this.setState({show: false})


  render() {
      console.log(this.state)
    return (
      <>
      <Carousel>
        {this.state.books.length ? (
          this.state.books.map((book) => (
            <Carousel.Item key={book._id}>
              <img src="https://m.media-amazon.com/images/I/51DF6ZR8G7L._AC_SY780_.jpg" alt={book.title}/>
              <Carousel.Caption>
                <>
                  <p className='book'>Title: {book.title}</p>
                  <p className='book'>Description: {book.description}</p>
                  <p className='book'>Status: {book.hasRead ? 'Have read' : 'Have not read'}</p>
                  <Button onClick={() => this.handleDeleteBook(book)}>Delete this book!</Button>
                  <Button variant="primary" onClick={() => this.handleSelectBook(book)}>Update this book!</Button>
                  
                </>
              </Carousel.Caption>
            </Carousel.Item>
          ))
        ) : (
          <h3>No books found! </h3>
        )}
      </Carousel>
      <CreateBookForm handleCreateBook={this.handleCreateBook}/>

      <UpdateBookForm handleClose={this.handleClose} show={this.state.show} handleUpdateBook={this.handleUpdateBook} selectedBook={this.state.selectedBook}/>

      </>
    )
  }
}

export default withAuth0(BestBooks);
