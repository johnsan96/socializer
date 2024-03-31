import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box, Card, CircularProgress, CardContent } from '@mui/material';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const [posts, setPosts] = useState([]);
    const [postLoading, setPostLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/posts', { withCredentials: true });
                setPosts(response.data);
                setPostLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setPostLoading(false);
            }
        };

        fetchPosts();
    }, [loading]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const imageData = new FormData();

            /*    imageData.append('title', title); */

            imageData.append('image', image);
            /*  imageData.append('name', '3434') */

            // Hochladen des Bildes 
            const imageResponse = await axios.post('http://localhost:4000/image', imageData, {
                /*  withCredentials: true, */
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const imageUrl = imageResponse.data.imageName;

            console.log(imageUrl)

            // Hochladen der Postdaten
            const postData = {
                title: title,
                description: description,

                image_url: imageUrl
            };

            await axios.post('http://localhost:4000/posts', postData, {
                withCredentials: true
            });

            // Erfolgreich erstellt
            console.log('Post successfully created!');
        } catch (error) {
            console.error('Error creating post:', error);
            setError('Error creating post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', gap: 20 }}>

            <Container maxWidth="md">
                <Typography variant="h4" gutterBottom>
                    All Posts
                </Typography>
                {postLoading ? (
                    <CircularProgress />
                ) : (
                    posts.map(post => (
                        <Card key={post.id} style={{}}>
                            <CardContent>
                                <Typography variant="h5">{post.title}</Typography>
                                <Typography>{post.description}</Typography>
                        
                                <img src={"http://localhost:4000/uploads/" + post.image_url} alt="Logo" width="200px" height="200px" />
                                {/* Hier könntest du auch das Bild anzeigen */}
                            </CardContent>
                        </Card>
                    ))
                )}
            </Container>
            <Container maxWidth="md">

                <Box sx={{}}>
                    <Typography variant="h4" gutterBottom>
                        Create a New Post
                    </Typography>
                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            fullWidth
                            label="Title"
                            variant="outlined"
                            margin="normal"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            accept="image/*"
                            id="image"
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <label htmlFor="image">
                            <Button variant="contained" component="span" sx={{ mt: 2 }}>
                                Upload Image
                            </Button>
                        </label>
                        {loading && <CircularProgress sx={{ mt: 2 }} />}
                        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading || !title || !description}
                            sx={{ mt: 2 }}
                        >
                            {loading ? 'Creating...' : 'Create Post'}
                        </Button>
                    </form>
                </Box>
            </Container>

        </div>

    );
};

export default PostForm;
