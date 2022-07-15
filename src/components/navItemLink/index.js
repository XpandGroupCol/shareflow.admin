import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { forwardRef } from 'react'

import { NavLink } from 'react-router-dom'
import styles from './navItemLink.module.css'

const NavItemLink = forwardRef(({ to, text, icon: Icon, onClose }, ref) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return isActive ? styles.active : styles.link
      }}
      ref={ref}
      onClick={onClose}
      end
    >
      <ListItem
        disablePadding sx={{
          background: 'inherit',
          marginBottom: '10px',
          color: 'inherit',
          borderRadius: '10px'
        }}
      >
        <ListItemButton
          sx={{
            borderRadius: 'inherit'
          }}

        >
          <ListItemIcon sx={{ minWidth: '36px' }}>
            <Icon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    </NavLink>
  )
})

export default NavItemLink
