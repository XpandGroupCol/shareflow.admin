
import Button from 'components/button'
import Typography from 'components/typography'
import styles from './media.module.css'

import RowMedia from 'components/rowMedia'

import { compareFiles } from 'utils/mediaFormat'
import { useGetCampaignById } from 'hooks/useGetCampaignById'
import { useNotify } from 'hooks/useNotify'
import { useNavigate, useParams } from 'react-router-dom'
import useValidatorFile from 'hooks/useValidatorFile'
import { copyValues } from 'utils/normalizeData'
import { useEffect } from 'react'
import { useMutate } from 'hooks/useMutate'
import { updateCampaign } from 'services/campaigns'
import { useQueryClient } from 'react-query'
import { CAMPAINGS } from 'configs/queryKeys'

const MediaPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const notify = useNotify()

  const { data = {}, isLoading, isError } = useGetCampaignById(id)

  const queryClient = useQueryClient()
  const { isLoading: loading, mutateAsync } = useMutate(updateCampaign)

  const { data: campaign = {} } = data

  const { files = [], validator, removeFile, setFiles } = useValidatorFile()

  useEffect(() => {
    if (campaign?.publishers) {
      setFiles(copyValues(campaign?.publishers))
    }
  }, [campaign, setFiles])

  const onSubmit = () => {
    const publishers = files.map(({ loading, ...restOfFiles }) => ({ ...restOfFiles }))

    mutateAsync({ id: campaign?._id, payload: { publishers } }).then(({ data }) => {
      if (data) {
        queryClient.invalidateQueries([CAMPAINGS])
        queryClient.invalidateQueries([CAMPAINGS, campaign?.id])

        navigate('/campaigns')
      }
    })
  }

  // const onBack = () => {
  //   updateCampaign({})
  // }

  const handleValidator = (index, { height, width, mimetype, label }) => ({ target }) => {
    const file = target.files[0]
    const media = new window.FormData()

    if (!file.type.includes('image')) {
      return notify.error(`El formato del archivo no es valido, el archivo debe ser ${mimetype}`)
    }

    media.append(label, file)
    media.append('width', width)
    media.append('height', height)
    validator(index, media)
  }

  const handleRemoveFile = index => () => removeFile(index)

  const disabledButton = compareFiles(campaign?.publishers, files)

  if (isLoading) return <h1>Cargando...</h1>

  if (isError) return <h1>Error</h1>

  return (
    <>
      <section className='headerSection'>
        <Typography fontSize='24px' component='h2' fontWeight='bold'>Multimedia</Typography>
      </section>

      <section className={styles.mediaPage}>
        <Typography
          fontSize='14px'
        >Por favor adjunte los archivos necesarion para los siguientes formatos
        </Typography>

        <section className={styles.uploadMedia}>

          {files.map(({ label, _id, height, width, mimetype, imageUrl, loading = false, error = false }, index) => (

            <div key={_id} className={styles.mediaRow}>
              <div>
                <Typography fontWeight='bold'>{label}</Typography>
                <Typography>Dimensiones: {width}x{height}.{mimetype}</Typography>
              </div>
              <RowMedia
                id={_id}
                isLoading={loading}
                url={imageUrl}
                upload={handleValidator(index, { height, width, mimetype, label })}
                remove={handleRemoveFile(index)}
                error={error}
              />
            </div>
          ))}
        </section>

        <Button onClick={onSubmit} loading={loading} disabled={disabledButton}>
          Agregar archivos
        </Button>
      </section>
    </>
  )
}

export default MediaPage
