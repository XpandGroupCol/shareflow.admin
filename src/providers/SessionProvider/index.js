import { GLOBAL_ERROR } from 'configs'
import { SESSION_DATA } from 'configs/auth'
import { useNotify } from 'hooks/useNotify'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { getSession, login, verifySession } from 'services/auth'
import { Storage } from 'utils/storage'
const SessionContext = createContext()

const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({ loadingPage: false, user: undefined, loading: false })

  const notify = useNotify()

  useEffect(() => {
    if (!getSession()) {
      setSession({ loadingPage: false, user: null, loading: false })
      return
    }

    setSession({ loadingPage: true, user: undefined, loading: false })
    verifySession().then((user) => {
      if (!user) {
        setSession({ loadingPage: false, user: null, loading: false })
        return
      }

      setSession({ loadingPage: false, user, loading: false })
    })
  }, [])

  const signIn = useCallback(async (payload) => {
    try {
      setSession({ loadingPage: false, user: null, loading: true })
      const user = await login(payload)
      setSession({ loadingPage: false, user, loading: false })
    } catch (error) {
      notify.error(GLOBAL_ERROR)
      setSession({ loadingPage: false, user: null, loading: false })
    }
  }, [notify])

  const setUSerSession = useCallback(({ role, name, avatar, email }) => {
    const user = { role, name, avatar, email }
    Storage.setSecure(SESSION_DATA, user)
    setSession(prev => ({ ...prev, user }))
  }, [])

  return (
    <SessionContext.Provider value={{ ...session, signIn, setUSerSession }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => useContext(SessionContext)

export default SessionProvider
