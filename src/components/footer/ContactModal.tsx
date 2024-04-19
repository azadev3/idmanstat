import React from 'react'
import '../../styles/footer/footer.scss';
import { IoIosClose } from "react-icons/io";
import { useContactModal } from '../../context/ContactUsModal';

const ContactModal = () => {

     const { setContact } = useContactModal(); //for close modal

  return (
    <div className='contact-modal'>

     <div className="close-modal">
     <IoIosClose id='closeicon' onClick={() => setContact(false)} />
     </div>
     <div className="toptitle">
          <p>Bizimlə əlaqəyə keçmək üçün aşağıdakı, formu doldurun və ya canlı dəstəyə yazın. </p>
     </div>

     <form className="contact-form">
          <div className="input-field">
               <input type="text" placeholder='Adınız' required/>
          </div>
          <div className="input-field">
               <input type="text" placeholder='Telefon Nömrəniz' required/>
          </div>
          <div className="input-field">
               <input type="text" placeholder='Email Ünvanınız' required/>
          </div>
          <div className="input-field-textarea">
               <textarea placeholder='Mesajınız...' required/>
          </div>

          <button id='send-message' onClick={(e) => e.preventDefault()}>
               Göndər
          </button>
     </form>

     </div>
  )
}

export default ContactModal
