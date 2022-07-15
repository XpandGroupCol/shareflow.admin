import { IconButton, InputAdornment } from '@mui/material'
import Input from 'components/input'
import { useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import styles from './inputSearch.module.css'
import { useQueryParams } from 'providers/QueryParamsProvider'
const InputSeach = ({ placeholder }) => {
  const { queryParams, setQueryParams } = useQueryParams()
  const [keyword, setKeyword] = useState(queryParams.search || '')

  const handleSetKeyword = ({ target }) =>
    setKeyword(target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!keyword) return
    if (keyword === queryParams.search) return
    setQueryParams({ page: 1, search: keyword })
  }

  const onClear = () => {
    setKeyword('')
    if (queryParams.search) setQueryParams({ page: 1, search: '' })
  }
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Input
        placeholder={placeholder}
        size='small' sx={{
          '& .MuiOutlinedInput-root': {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
          }
        }} value={keyword} onChange={handleSetKeyword}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end' sx={{ display: keyword ? 'flex' : 'none' }}>
              <IconButton
                aria-label='toggle password visibility'
                edge='end'
                type='button'
                onClick={onClear}
                size='small'
              >
                <ClearIcon fontSize='small' />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <button className={styles.button}>
        <SearchIcon />
      </button>
    </form>
  )
}

export default InputSeach
