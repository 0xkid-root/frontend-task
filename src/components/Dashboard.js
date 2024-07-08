import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Avatar,
  Tooltip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Visibility } from "@mui/icons-material";
import UserDetailsModal from "../model/UserDetailsModal";
import { allUserData, getSingleUserData } from "../utils/api";

const Dashboard = () => {
  const [fetchAllData, setFetchAllData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const observer = useRef();

  const handleOpen = (userId) => {
    fetchUserDetails(userId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const allUserList = async (page) => {
    setLoading(true);
    try {
      const response = await allUserData(page);
      setFetchAllData((prevData) => {
        const newData = response.data.filter((user) => !prevData.some((existingUser) => existingUser.id === user.id));
        return [...prevData, ...newData];
      });
      setHasMore(response.data.length > 0);
    } catch (error) {
      console.log("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async (userId) => {
    setLoading(true);
    try {
      const response = await getSingleUserData(userId);
      setSelectedUser(response.data);
    } catch (error) {
      console.log("Error fetching user details:", error);
    }finally{
      setLoading(false);
    }
  };

  const lastUserElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    allUserList(page);
  }, [page]);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ whiteSpace: "nowrap", color:"white" }}>
          Welcome to the Dashboard!
        </Typography>
        <Button component={Link} to="/logout" variant="contained" color="primary">
          Logout
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Id</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>First Name</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Last Name</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap", alignItems: "center", alignContent: "center" }}>Email</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>View Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchAllData.map((user, index) => {
              const lastUser = fetchAllData.length === index + 1;
              return (
                <TableRow ref={lastUser ? lastUserElementRef : null} key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Avatar alt={`${user.first_name} ${user.last_name}`} src={user.avatar} />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View Details">
                      <IconButton color="primary" onClick={() => handleOpen(user.id)}>
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <CircularProgress />
        </Box>
      )}
      <UserDetailsModal open={open} handleClose={handleClose} selectedUser={selectedUser} />
    </Container>
  );
};

export default Dashboard;
