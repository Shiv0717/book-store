// Footer.jsx
import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className='mt-5' style={{ backgroundColor: '#E0F3FF', color: '#0C6DFD', padding: '20px 0'  }}>
      <Container className="text-center">
        <p>&copy; 2025 Book Store. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
