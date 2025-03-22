import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

const List = () => {
  const [name, setName] = useState('');
  const [isbnNumber, setIsbnNumber] = useState('');
  const [price, setPrice] = useState('');
  const [author, setAuthor] = useState('');
  
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firebase.isLoggedIn) {
      alert('You must be logged in to add a book.');
      navigate('/login');
      return;
    }

    try {
      await firebase.HandleCreateNewListing(name, isbnNumber, price, author);
      alert('Book added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className='container mt-5'>
      <Form onSubmit={handleSubmit}>
        {/* Book Name */}
        <Form.Group className="mb-3" controlId="formBookName">
          <Form.Label>Enter Book Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Book Name"
          />
        </Form.Group>

        {/* Author */}
        <Form.Group className="mb-3" controlId="formBookAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            type="text"
            placeholder="Enter Author Name"
          />
        </Form.Group>

        {/* ISBN */}
        <Form.Group className="mb-3" controlId="formBookISBN">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            value={isbnNumber}
            onChange={(e) => setIsbnNumber(e.target.value)}
            type="text"
            placeholder="Enter ISBN"
          />
        </Form.Group>

        {/* Price */}
        <Form.Group className="mb-3" controlId="formBookPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            placeholder="Enter Price"
          />
        </Form.Group>

        {/* Submit Button */}
        <Button className='mb-4' variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default List;
