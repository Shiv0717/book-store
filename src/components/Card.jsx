import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Cards = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (firebase.isLoggedIn) {
      firebase.listAllBooks().then(docs => setBooks(docs));
    }
  }, [firebase]);

  if (!firebase.isLoggedIn) {
    return (
      <Container className="mt-5 text-center">
        <h1>Please Log In</h1>
        <p>You need to log in to view the book listings.</p>
        <Button onClick={() => navigate('/login')} variant="primary">Go to Login</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Welcome to Our Bookstore</h1>
      <p className="text-center mb-5">Discover a vast collection of books available for sale. Find your next read and enjoy your literary journey.</p>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {books.length > 0 ? (
          books.map((book, index) => (
            <Col key={index}>
              <Card className="shadow-lg card-hover" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                {/* Book Image */}
                <Card.Img 
                  variant="top"
                  src={book.imageUrl || 'https://images.squarespace-cdn.com/content/v1/52537290e4b0e53491ea5c01/1652286731491-1MH2EL9UF3XP771BTP6W/LeadWithAnd-InteriorCover.jpg'} 
                  alt={book.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />

                {/* Book Details */}
                <Card.Body>
                  <Card.Title className="fw-bold">{book.name}</Card.Title>
                  <Card.Text>
                    <strong>Author:</strong> {book.author || 'Unknown'} <br />
                    <strong>ISBN:</strong> {book.isbnNumber} <br />
                    <strong>Price:</strong> ${book.price}
                  </Card.Text>
                </Card.Body>

                {/* Footer with User Info */}
                <Card.Footer className="text-muted">
                  Listed by {book.userDisplayName || 'Unknown'} ({book.userEmail || 'N/A'})
                </Card.Footer>

                {/* View Details Button */}
                <Button onClick={() => navigate(`/book/view/${book.id}`)} variant="primary" className="mt-3">View Details</Button>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">No books available</p>
          </Col>
        )}
      </Row>

      {/* CSS for hover effect */}
      <style>{`
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </Container>
  );
};

export default Cards;
