import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from '@mui/material';
import { Security, People, AssignmentInd } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const drawerWidth = 240;

  const menuItems = [
    { text: 'User Management', icon: <People />, path: '/users' },
    { text: 'Role Management', icon: <AssignmentInd />, path: '/roles' },
    { text: 'Permission Management', icon: <Security />, path: '/permissions' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'black', // Sidebar background color
          color: '#ffffff', // Sidebar text color
        },
      }}
    >
      <Toolbar />
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            component={NavLink}
            to={item.path}
            activeClassName="Mui-selected"
            exact
            sx={{
              color: '#ffffff', // Set text color to white
              textDecoration: 'none',
              '&.Mui-selected': {
                backgroundColor: '#3949ab', // Active item background color
                color: '#ffffff', // Active item text color
              },
              '&:hover': {
                backgroundColor: '#283593', // Hover effect color
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: '#ffffff', // Set icon color to white
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                // color: 'white', // Ensure text color is white
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
