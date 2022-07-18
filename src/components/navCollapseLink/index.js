
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import Collapse from '@mui/material/Collapse'

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import NavItemLink from 'components/navItemLink'

const NavCollapseLink = ({ items = [], basePath, text, icon: Icon, onClose }) => {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(Boolean(pathname.includes(basePath)))

  const handleClick = () => {
    setOpen(!open)
  }

  useEffect(() => {
    setOpen(Boolean(pathname.startsWith(`/${basePath}`)))
  }, [pathname, basePath])

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{
          background: pathname.includes(basePath) || open ? '#461abf' : 'inherit',
          borderRadius: '10px',
          color: pathname.includes(basePath) || open ? 'white' : '#ffffffb3',
          marginBottom: '10px'
        }}
      >
        <ListItemIcon sx={{ minWidth: '36px' }}>
          <Icon fontSize='small' sx={{ color: pathname.startsWith(basePath) || open ? 'white' : '#ffffffb3' }} />
        </ListItemIcon>
        <ListItemText primary={text} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout='auto' unmountOnExit>
        <List
          component='div' disablePadding sx={{
            paddingLeft: '20px',
            paddingTop: '10px',
            '& svg': {
              fontSize: '14px'
            }
          }}
        >
          {items.map(({ to, text }) => (
            <NavItemLink key={to} to={to} text={text} onClose={onClose} icon={FiberManualRecordIcon} />
          ))}
        </List>
      </Collapse>
    </>
  )
}

export default NavCollapseLink
