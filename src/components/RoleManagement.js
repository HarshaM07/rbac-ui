import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Button, Modal, TextField, Switch, InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { roles, permissions } from '../mockData';

const RoleManagement = () => {
  const [roleList, setRoleList] = useState(roles);
  const [filteredRoles, setFilteredRoles] = useState(roles);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false); // Determines if the modal is for editing
  const [currentRole, setCurrentRole] = useState({ name: '', permissions: [] });

  // Search for roles by name
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = roleList.filter(role =>
      role.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredRoles(filtered);
  };

  // Toggle permission for a specific role
  const togglePermission = (roleId, permission) => {
    setRoleList(roleList.map(role => {
      if (role.id === roleId) {
        const updatedPermissions = role.permissions.includes(permission)
          ? role.permissions.filter(p => p !== permission)
          : [...role.permissions, permission];
        return { ...role, permissions: updatedPermissions };
      }
      return role;
    }));
  };

  // Open modal to add a new role
  const handleAddRoleClick = () => {
    setEditMode(false);
    setCurrentRole({ name: '', permissions: [] });
    setModalOpen(true);
  };

  // Add a new role to the list
  const handleAddRole = () => {
    if (!currentRole.name.trim()) {
      alert('Role name is required!');
      return;
    }
    if (roleList.some(role => role.name.toLowerCase() === currentRole.name.toLowerCase())) {
      alert('Role name must be unique!');
      return;
    }
    const newRole = { ...currentRole, id: roleList.length + 1 };
    const updatedList = [...roleList, newRole];
    setRoleList(updatedList);
    setFilteredRoles(updatedList);
    setModalOpen(false);
  };

  // Open modal to edit an existing role
  const handleEditRoleClick = (role) => {
    setEditMode(true);
    setCurrentRole({ ...role });
    setModalOpen(true);
  };

  // Save changes to an edited role
  const handleEditRole = () => {
    if (!currentRole.name.trim()) {
      alert('Role name is required!');
      return;
    }
    const updatedList = roleList.map(role =>
      role.id === currentRole.id ? { ...currentRole } : role
    );
    setRoleList(updatedList);
    setFilteredRoles(updatedList);
    setModalOpen(false);
  };

  // Delete a role from the list
  const handleDeleteRole = (roleId) => {
    const updatedList = roleList.filter(role => role.id !== roleId);
    setRoleList(updatedList);
    setFilteredRoles(updatedList);
  };

  return (
    <div>
      <h2>Role Management</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <TextField
          placeholder="Search Roles..."
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
        <Button variant="contained" onClick={handleAddRoleClick}>Add Role</Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Role Name</TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRoles.map(role => (
            <TableRow key={role.id}>
              <TableCell>{role.id}</TableCell>
              <TableCell>{role.name}</TableCell>
              <TableCell>
                {permissions.map(permission => (
                  <div key={permission} style={{ display: 'flex', alignItems: 'center' }}>
                    <Switch
                      checked={role.permissions.includes(permission)}
                      onChange={() => togglePermission(role.id, permission)}
                      color="primary"
                    />
                    {permission}
                  </div>
                ))}
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleEditRoleClick(role)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  style={{ marginLeft: '10px' }}
                  onClick={() => handleDeleteRole(role.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add/Edit Role Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div style={{
          margin: '100px auto', padding: '20px', backgroundColor: 'white',
          width: '400px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <h3>{editMode ? 'Edit Role' : 'Add Role'}</h3>
          <TextField
            label="Role Name"
            fullWidth
            value={currentRole.name}
            onChange={e => setCurrentRole({ ...currentRole, name: e.target.value })}
            margin="normal"
          />
          <h4>Assign Permissions</h4>
          {permissions.map(permission => (
            <div key={permission} style={{ display: 'flex', alignItems: 'center' }}>
              <Switch
                checked={currentRole.permissions.includes(permission)}
                onChange={() => {
                  const updatedPermissions = currentRole.permissions.includes(permission)
                    ? currentRole.permissions.filter(p => p !== permission)
                    : [...currentRole.permissions, permission];
                  setCurrentRole({ ...currentRole, permissions: updatedPermissions });
                }}
                color="primary"
              />
              {permission}
            </div>
          ))}
          <Button
            variant="contained"
            onClick={editMode ? handleEditRole : handleAddRole}
            style={{ marginTop: '20px' }}
          >
            {editMode ? 'Save Changes' : 'Add'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default RoleManagement;
