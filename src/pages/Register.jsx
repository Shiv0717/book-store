import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const firebase = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Signing up a user');
    try {
      const result = await firebase.signUpUserWithEmailAndPassword(email, password);
      console.log(result);
      alert('Account created successfully! Please login.');
      navigate('/login'); // Redirect to login after successful registration
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate('/');
    }
  }, [firebase, navigate]);

  return (
    <div className='container mt-5'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            type="email" 
            placeholder="Enter email" 
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            type="password" 
            placeholder="Password" 
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>

      <p className='mt-4'>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  )
}

export default Register;
