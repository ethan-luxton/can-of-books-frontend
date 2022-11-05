import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


class CreateBookForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        show: false,
        }
      }
        handleClose = () => this.setState({show: false})
        handleShow = () => this.setState({show: true})
        onSubmit = (event) => {
            event.preventDefault();
            const bookCreate = {
                title: event.target.formName.value,
                description: event.target.formDesc.value,
                hasRead: event.target.formRead.checked
            };
            this.props.handleCreateBook(bookCreate);
        }
        render() {
    return (
    <>
      <Button variant="primary" onClick={this.handleShow}>Create a new book!</Button>

      <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Enter the book you would like to add:</Modal.Title>
        </Modal.Header>
        <Modal.Body><Container>
                <Form onSubmit={this.onSubmit}>

                <Form.Group controlId='formName'>
                    <Form.Label>Book Title</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder="book title goes here..."
                    />
                </Form.Group>

                <Form.Group controlId='formDesc'>
                    <Form.Label>Book Description</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder="book description goes here..."
                    />
                </Form.Group>

                <Form.Group controlId='formRead'>
                    <Form.Check 
                    type="checkbox"
                    label="Have you read this book?"
                    />
                </Form.Group>

                <Button type="submit">Create Book!</Button>

                </Form>
            </Container></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
            
        
    )
  }
}

export default CreateBookForm;