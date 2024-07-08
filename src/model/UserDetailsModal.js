import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Avatar,
  IconButton,
  Backdrop,
  Fade,
  useMediaQuery,
  useTheme
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const UserDetailsModal = ({ open, handleClose, selectedUser }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? '75%' : 500, // Adjust width for mobile view
            maxWidth: '100%', // Ensure modal does not exceed screen width
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            overflowY: 'auto', // Allow scrolling if content exceeds modal height
          }}
        >
          {selectedUser && (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <Typography variant="h6" component="h2">
                  User Details
                </Typography>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box>
                <Avatar
                  alt={`${selectedUser.first_name} ${selectedUser.last_name}`}
                  src={selectedUser.avatar}
                  sx={{ width: isMobile ? 80 : 100, height: isMobile ? 80 : 100, marginBottom: 2 }}
                />
                <Typography variant="body1">
                  <strong>Id:</strong> {selectedUser.id}
                </Typography>
                <Typography variant="body1">
                  <strong>First Name:</strong> {selectedUser.first_name}
                </Typography>
                <Typography variant="body1">
                  <strong>Last Name:</strong> {selectedUser.last_name}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {selectedUser.email}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default UserDetailsModal;
