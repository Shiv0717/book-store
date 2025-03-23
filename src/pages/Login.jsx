import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const firebase = useFirebase();
  console.log(firebase);



  const navigate = useNavigate();

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate('/')
    }
  }, [firebase, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in a user');
    const result = await firebase.signInUserWithEmailAndPassword(email, password);
    console.log(result);
   
  }

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

        <Button variant="primary" type="submit">Login</Button>
      </Form>

      <h3 className='mt-5 mb-5'>OR</h3>
      <Button onClick={firebase.signInWithGoogle} variant='danger'>Sign in with Google</Button>
      
      <p className='mt-4'>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  )
}

export default Login;
