import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Container style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h1" component="h1" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
               :( אוווופס, סליחה, הדף שאתם מחפשים לא קיים
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/">
                חזרה לדף הבית
            </Button>
        </Container>
    );
};

export default NotFound;
