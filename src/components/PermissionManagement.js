import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Button, Modal, Checkbox, FormControlLabel, Typography, Box
} from '@mui/material';

const permissionsList = [
  'Read',
  'Write',
  'Edit',
  'Delete',
  'Manage Users',
  'View Reports',
];

const rolesWithPermissions = [
  { id: 1, role: 'Admin', permissions: ['Read', 'Write', 'Edit', 'Delete', 'Manage Users'] },
  { id: 2, role: 'Editor', permissions: ['Read', 'Write', 'Edit'] },
  { id: 3, role: 'Viewer', permissions: ['Read'] },
];

const PermissionManagement = () => {
  const [roles, setRoles] = useState(rolesWithPermissions);
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [updatedPermissions, setUpdatedPermissions] = useState([]);

  const handleEditPermissions = (role) => {
    setSelectedRole(role);
    setUpdatedPermissions(role.permissions);
    setOpen(true);
  };

  const handlePermissionToggle = (permission) => {
    if (updatedPermissions.includes(permission)) {
      setUpdatedPermissions(updatedPermissions.filter(p => p !== permission));
    } else {
      setUpdatedPermissions([...updatedPermissions, permission]);
    }
  };

  const savePermissions = () => {
    setRoles(roles.map(role =>
      role.id === selectedRole.id
        ? { ...role, permissions: updatedPermissions }
        : role
    ));
    setOpen(false);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Permission Management</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Role</TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map(role => (
            <TableRow key={role.id}>
              <TableCell>{role.role}</TableCell>
              <TableCell>{role.permissions.join(', ')}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  onClick={() => handleEditPermissions(role)}
                >
                  Edit Permissions
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Permissions Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Permissions for {selectedRole?.role}
          </Typography>
          {permissionsList.map(permission => (
            <FormControlLabel
              key={permission}
              control={
                <Checkbox
                  checked={updatedPermissions.includes(permission)}
                  onChange={() => handlePermissionToggle(permission)}
                />
              }
              label={permission}
            />
          ))}
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={savePermissions}
              style={{ marginRight: '10px' }}
            >
              Save
            </Button>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PermissionManagement;
