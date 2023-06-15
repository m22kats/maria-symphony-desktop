import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signInSelector } from '@redux/slices/auth/sign-in/sign-in.selector';
import { signInActions } from '@redux/slices/auth/sign-in/sign-in.slice';
import { FetchStatusEnum } from '@services/fetch.type';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { LoginIcon, LogoutIcon, MenuIcon } from '@mui/mui-icon.module';

const StyledLink = styled(Link)`
  && {
    color: var(--primary--color);
    cursor: pointer;
    text-decoration: none !important;
  }
`;

const drawerWidth = 240;

const navItems: MenuItem[] = [
  { name: 'Management', path: '/entity' },
  { name: 'Dashboard', path: '/', disabled: true },
];

interface MenuItem {
  name: string;
  path: string;
  disabled?: boolean;
}

export default function NavigationBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSignIn = useSelector(signInSelector.isSignIn);
  const signInFetchStatus = useSelector(signInSelector.signInFetchStatus);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await dispatch(signInActions.signOut());
  };

  const handleSignIn = async () => {
    navigate('/sign-in');
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Maria Symphony
      </Typography>
      <Divider />
      <List>
        {navItems.map((item: MenuItem) =>
          item.disabled ? (
            <ListItem key={item.name} disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} disabled>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ) : (
            <StyledLink to={item.path} key={item.name}>
              <ListItem key={item.name} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            </StyledLink>
          )
        )}
        <ListItemButton
          sx={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {signInFetchStatus === FetchStatusEnum.FETCHING ? (
            <CircularProgress size={20} color="inherit" />
          ) : isSignIn ? (
            <LogoutIcon onClick={handleSignOut} />
          ) : (
            <LoginIcon onClick={handleSignIn} />
          )}
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Maria Symphony
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) =>
              item.disabled ? (
                <Button key={item.name} sx={{ color: '#fff', mr: 2 }} disabled>
                  {item.name}
                </Button>
              ) : (
                <Link
                  to={item.path}
                  key={item.name}
                  style={{ textDecoration: 'none' }}
                >
                  <Button sx={{ color: '#fff', mr: 2 }}>{item.name}</Button>
                </Link>
              )
            )}
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {signInFetchStatus === FetchStatusEnum.FETCHING ? (
              <CircularProgress size={20} color="inherit" />
            ) : isSignIn ? (
              <IconButton onClick={handleSignOut} color="inherit">
                <LogoutIcon />
              </IconButton>
            ) : (
              <IconButton onClick={handleSignIn} color="inherit">
                <LoginIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
