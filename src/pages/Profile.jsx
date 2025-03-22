import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import { Container, Card, Button, Form, Image } from 'react-bootstrap';
import { getAuth, updateProfile } from 'firebase/auth';

const Profile = () => {
  const firebase = useFirebase();
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (firebase.isLoggedIn && currentUser) {
      setUser(currentUser);
      setDisplayName(currentUser.displayName || '');
    }
  }, [firebase]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      
      await updateProfile(currentUser, {
        displayName,
      });

      alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!firebase.isLoggedIn) {
    return (
      <Container className="text-center mt-5">
        <h1>Please Log In</h1>
      </Container>
    );
  }

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card style={{ width: '400px', padding: '20px' }}>
        <Card.Body className="text-center">
          <Image
            src={user?.photoURL || 'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg'} 
            alt="Profile"
            roundedCircle
            style={{ width: '150px', height: '150px', marginBottom: '20px' }}
          />
          <Card.Title>Profile Details</Card.Title>
          <Card.Text>
            <strong>Email:</strong> {user?.email}
          </Card.Text>

          {isEditing ? (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Display Name</Form.Label>
                <Form.Control 
                  type="text" 
                  value={displayName} 
                  onChange={(e) => setDisplayName(e.target.value)} 
                />
              </Form.Group>
              <Button variant="success" onClick={handleSave}>Save Changes</Button>
              <Button variant="secondary" className="ms-2" onClick={() => setIsEditing(false)}>Cancel</Button>
            </Form>
          ) : (
            <>
              <Card.Text>
                <strong>Display Name:</strong> {user?.displayName || 'Not Set'}
              </Card.Text>
              <Button variant="primary" onClick={handleEdit}>Edit Profile</Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
