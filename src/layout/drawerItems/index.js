import * as React from 'react'

import Divider from '@mui/material/Divider'

import List from '@mui/material/List'
import MailIcon from '@mui/icons-material/Mail'

import Toolbar from '@mui/material/Toolbar'
import CampaignIcon from '@mui/icons-material/Campaign'
import PersonIcon from '@mui/icons-material/Person'
import ArtTrackIcon from '@mui/icons-material/ArtTrack'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import InsightsIcon from '@mui/icons-material/Insights'
import Filter1Icon from '@mui/icons-material/Filter1'
import DashboardIcon from '@mui/icons-material/Dashboard'
import MovieIcon from '@mui/icons-material/Movie'

import { LogoIcon } from 'assets/icons'

import NavItemLink from 'components/navItemLink'
import NavCollapseLink from 'components/navCollapseLink'

const userItems = [{
  to: '/users',
  text: 'Lista'
},
{
  to: '/users/create',
  text: 'Nuevo usuario'
}]

const publishers = [{
  to: '/publishers',
  text: 'Lista'
},
{
  to: '/publishers/create',
  text: 'Nuevo Publisher'
}]

const DrawerItems = ({ onClose }) => (

  <div>
    <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <LogoIcon width={150} fill='white' />
    </Toolbar>
    <Divider color='#5327d1' />
    <List sx={{ padding: '20px 10px' }}>
      <NavItemLink
        to='/'
        icon={DashboardIcon}
        text='Dashboard'
        onClose={onClose}
      />

      <NavItemLink
        to='/invitation'
        icon={MailIcon}
        text='En espera'
        onClose={onClose}
      />

      <NavItemLink
        to='/campaigns'
        icon={CampaignIcon}
        text='Campañas'
        onClose={onClose}
      />

      <NavCollapseLink
        text='Usuarios'
        basePath='users'
        items={userItems}
        icon={PersonIcon}
        onClose={onClose}
      />

      <NavCollapseLink
        text='Publishers'
        basePath='publishers'
        items={publishers}
        icon={ArtTrackIcon}
        onClose={onClose}
      />

      <NavItemLink
        to='/sectors'
        icon={InsightsIcon}
        text='Sectores'
        onClose={onClose}
      />

      <NavItemLink
        to='/ages'
        icon={Filter1Icon}
        text='Edades'
        onClose={onClose}
      />

      <NavItemLink
        to='/targets'
        icon={GpsFixedIcon}
        text='Objetivos'
        onClose={onClose}
      />

      <NavItemLink
        to='/formats'
        icon={MovieIcon}
        text='Formatos'
        onClose={onClose}
      />
    </List>
  </div>
)

export default DrawerItems
