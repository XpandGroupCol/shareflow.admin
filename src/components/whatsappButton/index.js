import { WhatsappIcon } from 'assets/icons'

const WhatsappButton = ({ number }) => {
  return (
    <a href={`https://wa.me/${number}`} className='whatsappLink' target='_blank' rel='noreferrer'>
      <WhatsappIcon width={16} height={16} />
      Contactar
    </a>
  )
}

export default WhatsappButton
