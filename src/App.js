import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

import SessionProvider from 'providers/SessionProvider'
import Router from 'routes'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from 'theme'
import { LocalizationProvider } from '@mui/lab'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 2
    }
  }
})

function App () {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Router />
          </LocalizationProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <ToastContainer theme='colored' />
          <CssBaseline />
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default App
