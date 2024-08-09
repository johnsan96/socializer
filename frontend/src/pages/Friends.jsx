import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

function Friends() {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userTemp = localStorage.getItem("user");
        const userObject = JSON.parse(userTemp);
        setUser(userObject);

        if (userObject && userObject.id) {
          const response = await axios.get(import.meta.env.VITE_EXPRESS_API+ '/friendships?user_id=' + userObject.id);
          const friendships = response.data;

          const friendsDataPromises = friendships.map(async (friendship) => {

            const userResponse = await axios.get(import.meta.env.VITE_EXPRESS_API+ '/user/' + friendship.friend_id);
            return userResponse.data;
          });

          const friendsData = await Promise.all(friendsDataPromises);
          setFriends(friendsData);
        }
      } catch (error) {
        console.error('Fehler beim Abrufen der Freunde:', error);
        // Behandle den Fehler hier entsprechend
      }
    };

    fetchFriends();
  }, []); // Leeres Array als Abhängigkeit, um sicherzustellen, dass der Effekt nur einmal ausgeführt wird

  return (
    <div className="main" style={{ width: '100%' }}>
      <h2 className='underline'>Friends</h2>
      {friends.map(friend => (
        <Card key={friend.id} style={{ marginBottom: '1rem' }}>
          <CardHeader title={friend.username} />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {friend.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {friend.email}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Friends;
