import React, { useState } from 'react';
import { users, roles } from '../mockData';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Button, Modal, TextField, Select, MenuItem, Chip, Switch, InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const UserManagement = () => {
  const [userList, setUserList] = useState(users);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchQuery, setSearchQuery] = useState('');
  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: [], status: 'Active' });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = userList.filter(user =>
      user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
      user.email.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role.length) {
      if (isEditing && currentUser) {
        // Edit existing user
        const updatedUsers = userList.map(user =>
          user.id === currentUser.id ? { ...newUser, id: currentUser.id } : user
        );
        setUserList(updatedUsers);
        setFilteredUsers(updatedUsers);
      } else {
        // Add new user
        const newUserWithId = { ...newUser, id: userList.length + 1 };
        setUserList([...userList, newUserWithId]);
        setFilteredUsers([...userList, newUserWithId]);
      }

      setOpenAddEditModal(false);
      resetForm();
    } else {
      alert('All fields are required!');
    }
  };

  const handleEditUser = (user) => {
    setNewUser({ ...user });
    setCurrentUser(user);
    setIsEditing(true);
    setOpenAddEditModal(true);
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = userList.filter(user => user.id !== id);
    setUserList(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const toggleStatus = (id) => {
    const updatedUsers = userList.map(user =>
      user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
    );
    setUserList(updatedUsers);
  };

  const resetForm = () => {
    setNewUser({ name: '', email: '', role: [], status: 'Active' });
    setCurrentUser(null);
    setIsEditing(false);
  };

  return (
    <div>
      <h2>User Management</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <TextField
          placeholder="Search Users..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" onClick={() => { setOpenAddEditModal(true); resetForm(); }}>
          Add User
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {(Array.isArray(user.role) ? user.role : []).map(role => (
                  <Chip key={role} label={role} style={{ margin: '2px' }} />
                ))}
              </TableCell>
              <TableCell>
                <Switch
                  checked={user.status === 'Active'}
                  onChange={() => toggleStatus(user.id)}
                  color="primary"
                />
                {user.status}
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  style={{ marginLeft: '10px' }}
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add/Edit User Modal */}
      <Modal open={openAddEditModal} onClose={() => setOpenAddEditModal(false)}>
        <div style={{
          margin: '100px auto', padding: '20px', backgroundColor: 'white',
          width: '400px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <h3>{isEditing ? 'Edit User' : 'Add User'}</h3>
          <TextField
            label="Name"
            fullWidth
            value={newUser.name}
            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Email"
            fullWidth
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            margin="normal"
          />
          <Select
            multiple
            fullWidth
            value={newUser.role}
            onChange={e => setNewUser({ ...newUser, role: e.target.value })}
            margin="normal"
          >
            {roles.map(role => (
              <MenuItem key={role.id} value={role.name}>{role.name}</MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            onClick={handleAddUser}
            style={{ marginTop: '20px' }}
          >
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagement;
