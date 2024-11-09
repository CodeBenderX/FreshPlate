// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, TextField, Typography, Button, Box } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import auth from '../lib/auth-helper';
// import { read, update, remove } from './api-user.js';

// const useStyles = {
//   card: {
//     maxWidth: 600,
//     margin: 'auto',
//     textAlign: 'center',
//     marginTop: 5,
//     paddingBottom: 2
//   },
//   error: {
//     verticalAlign: 'middle'
//   },
//   title: {
//     marginTop: 2,
//     color: '#FF6E1C'
//   },
//   textField: {
//     marginLeft: 1,
//     marginRight: 1,
//     width: 300
//   },
//   submit: {
//     margin: 'auto',
//     marginBottom: 2
//   }
// };

// export default function MyAccount() {
//   const [values, setValues] = useState({
//     name: '',
//     email: '',
//     password: '',
//     error: '',
//     redirectToSignin: false,
//     userId: '',
//     open: false
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const abortController = new AbortController();
//     const signal = abortController.signal;
//     const jwt = auth.isAuthenticated();

//     read({userId: jwt.user._id}, {t: jwt.token}, signal).then((data) => {
//       if (data && data.error) {
//         setValues({...values, error: data.error});
//       } else {
//         setValues({...values, name: data.name, email: data.email, userId: data._id});
//       }
//     });

//     return function cleanup(){
//       abortController.abort();
//     }
//   }, []);

//   const handleChange = name => event => {
//     setValues({ ...values, [name]: event.target.value });
//   };

//   const clickSubmit = () => {
//     const jwt = auth.isAuthenticated();
//     const user = {
//       name: values.name || undefined,
//       email: values.email || undefined,
//       password: values.password || undefined
//     };

//     update({userId: jwt.user._id}, {t: jwt.token}, user).then((data) => {
//       if (data && data.error) {
//         setValues({...values, error: data.error});
//       } else {
//         setValues({...values, userId: data._id, error: '', open: true});
//       }
//     });
//   };

//   const deleteAccount = () => {
//     const jwt = auth.isAuthenticated();
//     remove({userId: jwt.user._id}, {t: jwt.token}).then((data) => {
//       if (data && data.error) {
//         setValues({...values, error: data.error});
//       } else {
//         auth.clearJWT(() => console.log('deleted'));
//         navigate('/');
//       }
//     });
//   };

//   return (
//     <Card sx={useStyles.card}>
//       <CardContent>
//         <Typography variant="h6" sx={useStyles.title}>
//           My Account
//         </Typography>
//         <TextField
//           id="name"
//           label="Name"
//           sx={useStyles.textField}
//           value={values.name}
//           onChange={handleChange('name')}
//           margin="normal"
//         />
//         <br />
//         <TextField
//           id="email"
//           type="email"
//           label="Email"
//           sx={useStyles.textField}
//           value={values.email}
//           onChange={handleChange('email')}
//           margin="normal"
//         />
//         <br />
//         <TextField
//           id="password"
//           type="password"
//           label="Password"
//           sx={useStyles.textField}
//           value={values.password}
//           onChange={handleChange('password')}
//           margin="normal"
//         />
//         <br />
//         {values.error && (
//           <Typography component="p" color="error">
//             {values.error}
//           </Typography>
//         )}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//           <Button color="primary" variant="contained" onClick={clickSubmit} sx={useStyles.submit}>
//             Update
//           </Button>
//           <Button color="secondary" variant="contained" onClick={deleteAccount} sx={useStyles.submit}>
//             Delete Account
//           </Button>
//         </Box>
//       </CardContent>
//       {values.open && (
//         <Typography component="p" color="primary">
//           Account successfully updated.
//         </Typography>
//       )}
//     </Card>
//   );
// }



// 

import React, { useEffect, useState } from 'react';
import auth from '../lib/auth-helper.js';
import { Card, CardContent, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';

const UserAccount = () => {
  const [user, setUser] = useState(null); // Initialize user as null
  const [loading, setLoading] = useState(true); // Loading state for conditional rendering
  const [error, setError] = useState(null); // Error state for any fetch issues
  const [updateData, setUpdateData] = useState({ name: '', email: '' }); // State for update form
  const [isUpdating, setIsUpdating] = useState(false); // State to manage update button state

  useEffect(() => {
    const authenticatedUser = auth.isAuthenticated();
    if (authenticatedUser) {
      setUser(authenticatedUser.user);
      setLoading(false);
    } else {
      async function fetchUserData() {
        try {
          const response = await fetch('/api/user');
          if (!response.ok) throw new Error('Failed to fetch user data');
          const data = await response.json();
          setUser(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Could not load user data. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
      fetchUserData();
    }
  }, []);

  // Handle update form changes
  const handleChange = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value
    });
  };

  // Handle updating the user information
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validate the update data
    if (!updateData.name || !updateData.email) {
      alert("Name and email are required.");
      return;
    }

    setIsUpdating(true); // Disable the button during update
    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) throw new Error('Failed to update user data');
      const updatedUser = await response.json();
      setUser(updatedUser); // Update the user state with new data
      setUpdateData({ name: '', email: '' }); // Reset the update form
      alert('User updated successfully');
    } catch (error) {
      console.error("Error updating user data:", error);
      setError("Could not update user data. Please try again later.");
    } finally {
      setIsUpdating(false); // Re-enable the button after update
    }
  };

  // Handle deleting the user
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmDelete) {
      try {
        const response = await fetch('/api/user/delete', {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete user data');
        setUser(null); // Clear user data from state
        alert('User account deleted successfully');
        auth.clearJWT(() => {
          window.location.href = '/'; // Redirect to homepage after logout
        });
      } catch (error) {
        console.error("Error deleting user data:", error);
        setError("Could not delete user data. Please try again later.");
      }
    }
  };

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 3 }}>
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Welcome, {user?.name || 'User'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your ID: {user?._id || 'No ID available'}
          </Typography>
        </CardContent>
      </Card>

      {/* Update Form */}
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <CardContent>
          <Typography variant="h6">Update Your Information</Typography>
          <form onSubmit={handleUpdate}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={updateData.name || user?.name || ''}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={updateData.email || user?.email || ''}
              onChange={handleChange}
              margin="normal"
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={isUpdating}
              sx={{ marginTop: 2 }}
            >
              {isUpdating ? 'Updating...' : 'Update'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Delete Account */}
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <CardContent>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleDelete}
            sx={{ marginTop: 2 }}
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserAccount;