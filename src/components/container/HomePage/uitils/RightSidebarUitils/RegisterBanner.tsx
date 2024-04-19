import React from 'react'
import '../../../../../styles/container/container.scss';
import { useNavigate } from 'react-router-dom';

type BoxTypes = {
     id: number,
     count: string,
     name: string,
     banner: string,
}

const RegisterBanner = () => {
     
     const navigate = useNavigate();

     const BoxItems:BoxTypes[] = [
          {
               id: 1,
               count: '76,233',
               name: 'İstifadəçi',
               banner: './bannericon.svg',
          },
          {
               id: 2,
               count: '12,053',
               name: 'Aktiv Kupon',
               banner: './bannericon2.svg',
          },
          {
               id: 3,
               count: '31',
               name: 'Analizçi',
               banner: './bannericon3.svg',
          },
          {
               id: 4,
               count: '652,738',
               name: 'Ümumi Kupon',
               banner: './bannericon4.svg',
          },
     ]

  return (
     <div className="register-banner-container">
          <div className='top-title-banner'>
               <span>Sən də İdmanStat Üzvü Ol</span>
          </div>

          <div className="content-banner">
               {BoxItems.map((box) => (
                    <div className='box' key={box.id}>
                         <div className='left'>
                              <strong>{box.count}</strong>
                              <span>{box.name}</span>
                         </div>
                         <div className='banner'>
                              <img src={box.banner} alt='box-banner' />
                         </div>
                    </div>
               ))}

               <div className='register-button' onClick={() => navigate('/profile')}>
                    <button>Qeydiyyatdan Keç</button>
               </div>
          </div>
     </div>
  )
}

export default RegisterBanner