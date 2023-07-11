import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

const user = {
  avatar: '/assets/avatars/avatar-anika-visser.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Anika Visser',
  timezone: 'GTM-7'
};

// const storedArrayAsString = window.sessionStorage.getItem('user');
// const storedArray = JSON.parse(storedArrayAsString);

let storedArray = null;
if (typeof window !== 'undefined') {
  const storedArrayAsString = window.sessionStorage.getItem('user');
  storedArray = JSON.parse(storedArrayAsString);
}

export const AccountProfile = () => (
  
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={storedArray.imageUrl || 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1688988394~exp=1688988994~hmac=acfb930ab7237d91c22e0b16085b68c33f731cc9645f6eb39fd492cc2f49f28e'}
          sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
        <Typography
          gutterBottom
          variant="h5"
        >
          {storedArray.alias || storedArray.username}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {storedArray.email} 
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user.timezone}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions>
  </Card>
);
