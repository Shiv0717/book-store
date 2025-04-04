import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

const BookDetails = () => {
  const { id } = useParams();
  const firebase = useFirebase();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const docSnap = await firebase.getBookById(id);
        if (docSnap.exists()) {
          setBook(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchBook();
  }, [id, firebase]);

  if (!book) {
    return <Container className="text-center mt-5"><p>Loading...</p></Container>;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card style={{ width: '80%', maxWidth: '900px', padding: '40px', borderRadius: '20px' }} className="shadow-lg">
        <Row>
          {/* Left side - Image */}
          <Col md={6}>
            <div className="overflow-hidden rounded" style={{ height: '100%' }}>
              <Card.Img 
                src={book.imageUrl || 'https://images.squarespace-cdn.com/content/v1/52537290e4b0e53491ea5c01/1682529825334-041VOE86JSPO3SR90L3R/ACES-interior.jpg'} 
                alt={book.name} 
                className="w-100 h-100 object-fit-cover img-hover"
              />
            </div>
          </Col>

          {/* Right side - Text */}
          <Col md={6} className="d-flex flex-column justify-content-center">
            <Card.Body>
              <Card.Title className="text-primary fw-bold" style={{ fontSize: '2.5rem' }}>{book.name}</Card.Title>
              <Card.Text style={{ fontSize: '1.2rem' }}>
                <strong>ISBN:</strong> {book.isbnNumber} <br />
                <strong>Price:</strong> ${book.price} <br />
                <strong>Listed by:</strong> {book.userDisplayName || 'Unknown'} ({book.userEmail || 'N/A'})
              </Card.Text>
              <p style={{ fontSize: '1rem', marginTop: '20px' }}>
                This book is a remarkable addition to any collection. It offers a compelling story and is a must-read for all book lovers.
              </p>
              <Button 
                variant="primary" 
                onClick={() => window.history.back()} 
                className="btn-hover"
              >
                Go Back
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      {/* CSS for Hover Effects using Bootstrap */}
      <style>
        {`
          .img-hover {
            transition: transform 0.3s ease;
          }
          .img-hover:hover {
            transform: scale(1.05);
          }

          .btn-hover {
            transition: background-color 0.3s ease, transform 0.3s ease;
          }
          .btn-hover:hover {
            background-color: #0d6efd;
            transform: scale(1.05);
          }
        `}
      </style>
    </Container>
  );
};

export default BookDetails;
