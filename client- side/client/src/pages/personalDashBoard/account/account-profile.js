import {Box,Button,Card,CardActions,CardContent,Divider,Typography} from '@mui/material';


export const AccountProfile = ({user}) => (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
        >
          {user.firstName+" "}{user.lastName}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user.userName} 
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user.address}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
   
  </Card>
);
