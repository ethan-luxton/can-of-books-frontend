import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class UpdateBookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // _id: this.props.selectedBook?._id,
      title: this.props.selectedBook?.title,
      description: this.props.selectedBook?.description,
      hasRead: this.props.selectedBook?.hasRead,
      // show: false,
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const updatedBook = {
      _id: this.props.selectedBook?._id,
      title: this.state.title || this.props.selectedBook.title,
      description: this.state.description || this.props.selectedBook.description,
      hasRead: this.state.hasRead || this.props.selectedBook.hasRead
    }
    console.log('updatedBook: ', updatedBook);
    this.props.handleUpdateBook(updatedBook);
    this.props.handleClose();
  }

  handleTitleChange = event => this.setState({ title: event.target.value });
  handleDescriptionChange = event => this.setState({ description: event.target.value });
  handleReadChange = event => this.setState({ hasRead: event.target.checked });


  render() {
    console.log("State: ", this.state)
    console.log("Props: ", this.props)
    return (

      <>

        <Modal show={this.props.show} onHide={this.props.handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Update the book!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Container>

              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={this.state.title}
                    onChange={this.handleTitleChange}
                    defaultValue={this.props.selectedBook.title}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={this.state.description}
                    defaultValue={this.props.selectedBook.description}
                    onChange={this.handleDescriptionChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="Have you read this book?"
                    onChange={this.handleReadChange}
                    checked={this.props.selectedBook.hasRead}
                  />
                </Form.Group>

                <Button type='submit'>Submit</Button>

              </Form>
            </Container>
          </Modal.Body>
        </Modal>
      </>

    )
  }
}

export default UpdateBookForm;