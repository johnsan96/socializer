import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

function Main() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Axios-Anfrage an den Server
    axios.get('http://localhost:4000/posts', { withCredentials: true })
      .then(response => {
        // Erfolgreiche Antwort vom Server erhalten
        console.log('Posts erhalten:', response.data);
        setPosts(response.data); // Setze die Posts im Zustand
      })
      .catch(error => {
        // Fehler beim Abrufen der Posts
        console.error('Fehler beim Abrufen der Posts:', error);
        // Behandle den Fehler hier entsprechend
      });
  }, []); // Leeres Array als Abhängigkeit, um sicherzustellen, dass der Effekt nur einmal ausgeführt wird

  return (
    <div className="main" style={{ width: '100%' }}>
      <h2 className='underline'> Welcome</h2>
      {/* Zeige die Posts an */}
      {posts.map((post, index) => (
        <Card>
          <CardContent>
            <Typography variant="h5">{post.title}</Typography>
            <Typography>{post.description}</Typography>

            <img src={"http://localhost:4000/uploads/" + post.image_url} alt="Logo" width="200px" height="200px" />
            {/* Hier könntest du auch das Bild anzeigen */}
          </CardContent>

        </Card>
      ))}
    </div>
  );
}

export default Main;
