import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#5b27ed'
    },
    secondary: {
      main: '#ed6e27',
      contrastText: '#fff'
    },
    success: {
      main: '#4caf50'
    },
    error: {
      main: '#f44336'
    },
    default: {
      main: '#e0e0e0',
      contrastText: '#000000de'
    },
    background: {
      default: '#fff'
    },
    text: {
      primary: '#4b494f',
      success: '#fff'
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          textTransform: 'capitalize'
        }
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          // backgroundColor: 'transparent',
          // backdropFilter: 'blur(2px)'

        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '8px',
          padding: '20px'
        },
        root: {
          '& .MuiBackdrop-root': {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(2px)'
          }
        }
      }
    }
  }
})
