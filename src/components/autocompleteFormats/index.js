import Autocomplete from 'components/autocomplete'
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react'
import { getFormats } from 'services/lists'
import { debounce } from 'utils/helpers'

const AutocompleteFormats = forwardRef(({ ...props }, ref) => {
  const [keyWord, setKeyWord] = useState('')
  const [request, setRequest] = useState({
    loading: false,
    data: []
  })

  const getLists = useCallback(async (searh) => {
    try {
      if (searh) {
        setRequest({ loading: true, data: [] })
        const { data } = await getFormats(searh)
        setRequest({ loading: false, data })
      } else {
        setRequest(prev => ({ ...prev, loading: false }))
      }
    } catch (e) {
      setRequest(prev => ({ ...prev, loading: false }))
    }
  }, [])

  useEffect(() => {
    debounce(() => getLists(keyWord), 300)()
  },
  [getLists, keyWord])

  const handleInputChange = (_, value) => setKeyWord(value)

  const memoOptions = useMemo(() => request.data, [request.data])

  return (
    <Autocomplete
      {...props}
      onInputChange={handleInputChange}
      options={memoOptions}
      noOptionsText='No hay opciones, por favor digita el sector que deseas buscar'
      loading={request.loading}
      loadingText='Buscando ...'
    />
  )
})

export default AutocompleteFormats
