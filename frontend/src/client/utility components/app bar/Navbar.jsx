import * as React from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography,
  Button, Drawer, List, ListItem, ListItemButton, ListItemText, Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { AuthContext } from '../../../context/AuthContext';

import './Navbar.css';

function Navbar() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
  const { authenticated, user } = React.useContext(AuthContext);
  const theme = useTheme();

  return (
    <>
      <AppBar
        position="sticky"
        elevation={4}
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          py: { xs: 1, sm: 1.5, md: 2 },
          px: { xs: 1, sm: 3, md: 6 },
          zIndex: 1201,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Logo + Title */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}>
                <img
                  src="/images/static/department_management_system.png"
                  alt="Logo"
                  height="60px"
                  style={{ marginRight: "20px" }}
                />
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    fontFamily: 'Times New Roman',
                    fontWeight: 1000,
                    letterSpacing: '.3rem',
                    display: { xs: 'none', md: 'block' },
                  }}
                >
                  LEARNING MANAGEMENT SYSTEM
                </Typography>
              </Link>
            </Box>

            {/* Hamburger Menu (mobile only) */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setMobileDrawerOpen(true)}
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Desktop Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              {!authenticated && (
                <>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      sx={{
                        background: 'linear-gradient(to right, #ff7043, #f4511e)',
                        color: '#fff',
                        "&:hover": {
                          background: 'linear-gradient(to right, #f4511e, #e64a19)',
                        },
                      }}
                      startIcon={<LoginIcon />}
                    >
                      Login
                    </Button>
                  </Link>

                  <Link to="/register" style={{ textDecoration: "none" }}>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: '#f4511e',
                        color: '#f4511e',
                        "&:hover": {
                          borderColor: '#e64a19',
                          backgroundColor: '#fff3e0',
                        },
                      }}
                    >
                      Register
                    </Button>
                  </Link>
                </>
              )}

              {authenticated && (
                <>
                  <Link to={`/${user.role.toLowerCase()}`} style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="warning">Dashboard</Button>
                  </Link>
                  <Link to="/logout" style={{ textDecoration: "none" }}>
                    <Button variant="outlined" color="error">Log Out</Button>
                  </Link>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setMobileDrawerOpen(false)}>
          <List>
            {!authenticated ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/login">
                    <LoginIcon sx={{ mr: 1 }} />
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/register">
                    <ListItemText primary="Register" />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to={`/${user.role.toLowerCase()}`}>
                    <ListItemText primary="Dashboard" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/logout">
                    <ListItemText primary="Log Out" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
