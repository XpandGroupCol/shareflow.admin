
import Button from 'components/button'
import Typography from 'components/typography'
import styles from './media.module.css'

import RowMedia from 'components/rowMedia'

import { compareFiles } from 'utils/mediaFormat'
import { useNotify } from 'hooks/useNotify'
import { useNavigate } from 'react-router-dom'
import useValidatorFile from 'hooks/useValidatorFile'
import { useMutate } from 'hooks/useMutate'
import { updateCampaign } from 'services/campaigns'
import { useQueryClient } from 'react-query'
import { CAMPAINGS } from 'configs/queryKeys'
import { copyValues } from 'utils/publishersFormat'

const MediaForm = ({ campaign }) => {
  const navigate = useNavigate()
  const notify = useNotify()

  const queryClient = useQueryClient()
  const { isLoading: loading, mutateAsync } = useMutate(updateCampaign)

  const { files = [], validator, removeFile } = useValidatorFile(copyValues(campaign?.publishers))

  const onSubmit = () => {
    const emptyFiles = files.some(({ media }) => !media?.url)
    const publishers = files.map(({ loading, ...restOfFiles }) => ({ ...restOfFiles }))

    mutateAsync({ id: campaign?._id, payload: { publishers } }).then(({ data }) => {
      if (data) {
        queryClient.invalidateQueries([CAMPAINGS])
        queryClient.invalidateQueries([CAMPAINGS, campaign?._id])
        navigate(emptyFiles ? '/campaigns' : `/campaigns/${campaign?._id}/order`)
      }
    })
  }

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

  return (
    <section className={styles.mediaPage}>
      <Typography
        fontSize='14px'
      >Por favor adjunte los archivos necesarion para las siguientes images
      </Typography>

      <section className={styles.uploadMedia}>

        {files.map(({ label, _id, height, width, mimetype, media, loading = false, error = false }, index) => (

          <div key={_id} className={styles.mediaRow}>
            <div>
              <Typography fontWeight='bold'>{label}</Typography>
              <Typography>Dimensiones: {width}x{height}.{mimetype}</Typography>
            </div>
            <RowMedia
              id={_id}
              isLoading={loading}
              url={media?.url || ''}
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
  )
}

export default MediaForm
