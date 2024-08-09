import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

function Main() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {

    let userTemp = localStorage.getItem("user");
    setUser(JSON.parse(userTemp))
    // Axios-Anfrage an den Server
    axios.get(import.meta.env.VITE_EXPRESS_API +'/posts', { withCredentials: true })
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
  }, []);

  return (
    <div className="main" style={{ width: '100%' }}>
      <h2 className='underline'> Welcome {user?.username + " " + user?.id}</h2>
      {/* Zeige die Posts an */}
      {posts.map((post, index) => (
        <>
          {post.image_url != 'test_image_url' ?

            < Card >
              <CardContent>
                <Typography variant="h5">{post.title}</Typography>
                <Typography>{post.description}</Typography>

                {post.image_url != 'test_image_url' ?
                  <img src={import.meta.env.VITE_EXPRESS_API+ "/uploads/" + post.image_url} alt="Logo" width="200px" height="200px" />
                  :
                  <></>
                }

              </CardContent>

            </Card>
            :

            <></>
          }
        </>


      ))
      }
    </div >
  );
}

export default Main;
