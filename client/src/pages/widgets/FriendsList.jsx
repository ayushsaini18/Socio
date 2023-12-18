import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, useTheme } from '@mui/material';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';

const FriendsList = ({ friends }) => {
  const { palette } = useTheme();

  // Check if 'friends' is not an array
  if (!Array.isArray(friends)) {
    // Handle the case where friends is not an array (e.g., show an error message)
    return (
      <WidgetWrapper>
        <Typography color={palette.error.main} variant="h5" fontWeight="500">
          Error: Friends data is not available.
        </Typography>
      </WidgetWrapper>
    );
  }

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.main}
        variant="h5"
        fontWeight="500"
        sx={{ mb: '1.5rem' }}
      >
        Friends List
      </Typography>
      <Box gap="2rem" display="flex" flexDirection="column">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendImage={friend.picturePath}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.location}
            friendId={friend._id}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

FriendsList.propTypes = {
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      picturePath: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    })
  ),
};

// Provide a default prop value to handle cases where 'friends' is not passed
FriendsList.defaultProps = {
  friends: [],
};

export default FriendsList;
