import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { BarChart, Group, Security } from '@mui/icons-material';
import { users, roles, permissions } from '../mockData';

const LandingPage = () => {
  // Calculate counts dynamically
  const totalUsers = users.length;
  const totalRoles = roles.length;
  const uniquePermissionsCount = new Set(roles.flatMap(role => role.permissions)).size;

  // Overview items with dynamic data
  const overviewItems = [
    { icon: <Group fontSize="large" color="primary" />, title: 'Total Users', count: totalUsers },
    { icon: <Security fontSize="large" color="primary" />, title: 'Total Roles', count: totalRoles },
    { icon: <BarChart fontSize="large" color="primary" />, title: 'Total Permissions', count: uniquePermissionsCount },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      <Grid container spacing={4}>
        {overviewItems.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ textAlign: 'center', boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
                  {item.icon}
                  <Typography variant="h6">{item.title}</Typography>
                </Box>
                <Typography variant="h3" color="secondary">{item.count}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LandingPage;
