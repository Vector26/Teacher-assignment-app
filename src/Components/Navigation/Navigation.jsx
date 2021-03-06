import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import LoginIcon from '@mui/icons-material/Login';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import './Navigation.css'
import {PRIMARY,PRIMARY_TEXT,ACCENT, CONTRAST_TEXT} from '../../Colors/index';
import { setAuth, setUser } from '../../actions/auth-actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import avatar from '../../media/avatar.png'


const Navigation = ({bg,color}) => {
  let User=useSelector((state)=> state.Auth.user);
  let isAuth=useSelector((state)=> state.Auth.Auth);
  const dispatch=useDispatch();
  const history=useHistory();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  
  const logout=()=>{
    dispatch(setUser({}));
    dispatch(setAuth(false));
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getAuth=()=>{
    history.push('/authenticate');
  }

  const gotoAbout=()=>{
    history.push('/about')
  }
  
  const pages = [{name:'About US',action:gotoAbout}];
  const settings = [{name:'Dashboard',action:null}, {name:'Logout',action:logout}];
  
  return (
    <AppBar position="fixed" sx={{minHeight:'3em',maxHeight:'4.5em',backgroundColor:bg,color:color}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <LocalShippingIcon/>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={page.action}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <LocalShippingIcon/>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={page.action}
                sx={{ my: 2, color: color, display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        {isAuth ?
            (<Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={avatar} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={setting.action}>
                    <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
                ))}
            </Menu>
            </Box>) : (
            <Box>
              <IconButton onClick={getAuth} variant="outlined" sx={{color:CONTRAST_TEXT}}><LoginIcon/></IconButton>
            </Box>
            )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export const ActionBox=({children,sx})=>{
    return (<>
        <Box className='ActionBox' style={sx}>
            {children}
        </Box>
    </>);
}
export default Navigation;
