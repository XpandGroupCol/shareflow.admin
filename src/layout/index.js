
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'

import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'

import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'

import { LogoIcon } from 'assets/icons'
import DrawerItems from './drawerItems'
import styles from './auth.module.css'
import { useState } from 'react'
import { useSession } from 'providers/SessionProvider'
import Typography from 'components/typography'
import Avatar from 'components/avatar'
import { Divider, Menu, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'
import { logout } from 'services/auth'
import LogoutIcon from '@mui/icons-material/Logout'

const drawerWidth = 250

export default function Layout ({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const { user } = useSession()

  const handleDrawerToggle = (bool) => () => {
    setMobileOpen(bool)
  }

  const handleClick = (event) =>
    setAnchorEl(event.currentTarget)

  const handleClose = () =>
    setAnchorEl(null)

  const container = window !== undefined ? window.document.body : undefined

  const open = Boolean(anchorEl)

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: ' rgb(247, 249, 252)' }}>
      <AppBar
        position='fixed'
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          boxShadow: 'rgb(34 51 84 / 10%) 0px 2px 4px -3px, rgb(34 51 84 / 5%) 0px 5px 12px -4px',
          background: 'white'
        }}
      >
        <Toolbar sx={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color='primary'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle(true)}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box component='span' sx={{ display: { md: 'none', xs: 'flex' }, alignItems: 'center' }}>
              <LogoIcon width={120} color='#4b494f' />
            </Box>
          </Box>
          <button onClick={handleClick} className={styles.logout}>
            <div className={styles.userInfo}>
              <Typography sx={{
                maxWidth: '150px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: 14,
                fontWeight: 'bold'
              }}
              >{user?.name}
              </Typography>
              <Typography color='gray' sx={{ fontSize: 12, textAlign: 'right' }}>{user?.role}</Typography>
            </div>
            <Avatar src={user?.avatar?.url} label={user?.name} sx={{ width: 36, height: 36 }} />

          </button>
          <Menu
            id='header-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            sx={{
              '& .MuiPaper-root': {
                boxShadow: 'rgb(0 0 0 / 10%) 0px 4px 12px',
                paddingTop: '15px'
              }
            }}
          >
            <MenuItem sx={{ gap: '20px' }}>
              <div>
                <Typography fontWeight='bold'>{user?.name}
                </Typography>
                <Typography color='gray' sx={{ fontSize: 12 }}>{user?.role}</Typography>
              </div>
              <Avatar src={user?.image} label={user?.name} sx={{ width: 36, height: 36 }} />
            </MenuItem>
            <Divider />
            <Link to='/profile'>
              <MenuItem component='span' onClick={handleClose}>
                <PersonIcon fontSize='small' sx={{ marginRight: '10px' }} />
                Perfil
              </MenuItem>
            </Link>
            <Divider />
            <MenuItem onClick={logout}>
              <LogoutIcon fontSize='small' sx={{ marginRight: '10px' }} />
              Cerrar sesion
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label='mailbox folders'
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle(false)}
          elevation={6}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#5b27ed', border: 'none' }
          }}
        >
          <DrawerItems onClose={handleDrawerToggle(false)} />
        </Drawer>
        <Drawer
          variant='permanent'
          color='primary'
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#5b27ed', border: 'none' }
          }}
          open
        >
          <DrawerItems onClose={() => {}} />
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          overflowX: 'hidden'

        }}
      >
        <Box sx={{ height: 'calc(100% - 64px)', marginTop: '64px', overflow: 'hidden' }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
