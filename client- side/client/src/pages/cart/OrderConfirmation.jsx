import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const OrderConfirmation = () => {
  const location = useLocation();
  const { status, orderCode } = location.state || { status: 'unknown', orderCode: 'N/A' };

  const isSuccess = status === 'Created';
  const message = isSuccess 
    ? `הזמנתך בוצעה בהצלחה! מספר הזמנה: ${orderCode}`
    : `תקלה! הזמנתך לא נקלטה, אנא נסה שוב מאוחר יותר`;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={2}
      bgcolor="#f0f0f0"
      borderRadius={1}
      boxShadow={3}
      style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px' }}
    >
      {isSuccess ? (
        <CheckCircleOutlineIcon color="success" style={{ marginRight: '8px' }} />
      ) : (
        <ErrorOutlineIcon color="error" style={{ marginRight: '8px' }} />
      )}
      <Typography variant="h6">
        {message}
      </Typography>
    </Box>
  );
};

export default OrderConfirmation;
