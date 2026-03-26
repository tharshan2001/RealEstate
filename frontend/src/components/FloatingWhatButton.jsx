import { useNavigate } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'

const FloatingWhatButton = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/what', { state: { message: 'Can I get more info?' } })
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      className="
        fixed bottom-6 right-6 z-50
        flex items-center justify-center
        w-14 h-14
        rounded-full
        bg-[#25D366]
        text-white
        shadow-lg
        hover:scale-110
        active:scale-95
        transition-all duration-200
      "
    >
      <FaWhatsapp size={28} />
    </button>
  )
}

export default FloatingWhatButton