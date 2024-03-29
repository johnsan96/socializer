import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Importiere Axios
import { TextField, Button, Typography, Container, Box, CircularProgress } from '@mui/material';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const { token, setToken } = useAuth();

    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Sende POST-Anfrage an den Server
            const response = await axios.post('http://localhost:4000/login', { name }, { withCredentials: true });

            // Extrahiere die Tokens aus der Server-Antwort
            const { accessToken, refreshToken } = response.data;
            // Speichere die Tokens im lokalen Speicher oder Cookie
        /*     localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken); */
            // Navigiere zur vorherigen Seite
            setToken(accessToken)
            navigate(from, { replace: true });
        } catch (err) {
            console.error('Fehler beim Login:', err);
            setError('Fehler beim Login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h3" sx={{ color: 'black', fontWeight: 'bold' }}>
                    Login
                </Typography>
                {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                <Box component="form" onSubmit={handleLoginFormSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, bgcolor: 'blue', '&:hover': { bgcolor: '#333' } }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Login'}
                    </Button>
                </Box>
                <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    fullWidth
                    sx={{ mb: 2, bgcolor: 'blue', '&:hover': { bgcolor: '#333' } }}
                >
                    Registrieren
                </Button>
            </Box>
        </Container>
    );
};

export default Login;
