import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

function Friends() {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    let userTemp = localStorage.getItem("user");
    let userObject = JSON.parse(userTemp)
    setUser(userObject);
    // Axios-Anfrage an den Server
    axios.get('http://localhost:4000/friendships?user_id=' + userObject?.id)
      .then(response => {
        // Erfolgreiche Antwort vom Server erhalten
        console.log('Friends erhalten:', response.data);
        setFriends(response.data); // Setze die Posts im Zustand
      })
      .catch(error => {
        // Fehler beim Abrufen der Posts
        console.error('Fehler beim Abrufen der Posts:', error);
        // Behandle den Fehler hier entsprechend
      });
  }, []); // Leeres Array als Abhängigkeit, um sicherzustellen, dass der Effekt nur einmal ausgeführt wird


  return (
    <div className="main" style={{ width: '100%' }}>
      <h2 className='underline'> Friends</h2>
      {/* Zeige die Posts an */}

    </div>
  );
}

export default Friends;
