import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'

import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'

import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'

import { LogoIcon } from 'assets/icons'
import DrawerItems from './drawerItems'

const drawerWidth = 250

export default function Layout ({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = (bool) => () => {
    setMobileOpen(bool)
  }

  const container = window !== undefined ? window.document.body : undefined

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position='fixed'
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          boxShadow: 'rgb(34 51 84 / 10%) 0px 2px 4px -3px, rgb(34 51 84 / 5%) 0px 5px 12px -4px'
        }}
      >
        <Toolbar sx={{ height: '64px', background: 'white', display: 'flex', alignItems: 'center' }}>
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
