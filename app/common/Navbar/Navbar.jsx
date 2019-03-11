import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import style from './style.scss';

const Navbar = props => {
  const [anchorEl, setAnchorEl] = useState(null); // local State
  // update Local State
  const handleOpen = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          className={style.menuBtn}
          color="inherit"
          aria-label="Menu"
          onClick={handleOpen}
        >
          <Icon>menu</Icon>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/">Home</Link>
          </MenuItem>
        </Menu>
        <Link to="/" className={style.title}>
          <Typography variant="h5">App Title</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
