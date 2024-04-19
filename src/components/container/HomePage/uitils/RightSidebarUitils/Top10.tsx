import React from 'react'
import '../../../../../styles/container/container.scss';

type AnaliserType = {
  id: number,
  profile: string,
  level: string,
  name: string,
  country: string,
  profit: string,
  tips: string,
};

const Top10 = () => {

  const AnaliserItems:AnaliserType[] = [
    {
      id: 1,
      profile: './top10profile/1.svg',
      level: '77',
      name: 'DOMADORES Club',
      country: 'United Arab Emirates',
      profit: '+63,392.81',
      tips: '1683',
    },
    {
      id: 2,
      profile: './top10profile/2.svg',
      level: '51',
      name: 'Freeze',
      country: 'Germany',
      profit: '+6,692.81',
      tips: '16898',
    },
    {
      id: 3,
      profile: './top10profile/3.svg',
      level: '41',
      name: 'Fuxion',
      country: 'United Kingdom',
      profit: '+6,692.81',
      tips: '16898',
    },
    {
      id: 4,
      profile: './top10profile/4.svg',
      level: '37',
      name: 'Sizzling',
      country: 'Austria',
      profit: '+6,692.81',
      tips: '16898',
    },
    {
      id: 5,
      profile: './top10profile/5.svg',
      level: '50',
      name: 'Yoelvillano',
      country: 'Cuba',
      profit: '+6,6292.81',
      tips: '16898',
    },
    {
      id: 6,
      profile: './top10profile/6.svg',
      level: '37',
      name: 'Sikelia',
      country: 'Italy',
      profit: '+6,692.81',
      tips: '16898',
    },
    {
      id: 7,
      profile: './top10profile/7.svg',
      level: '20',
      name: 'value razze',
      country: 'Germany',
      profit: '+6,6292.81',
      tips: '16898',
    },
    {
      id: 8,
      profile: './top10profile/8.svg',
      level: '42',
      name: 'Paolo90',
      country: 'Canada',
      profit: '+6,2692.81',
      tips: '16898',
    },
    {
      id: 9,
      profile: './top10profile/9.svg',
      level: '46',
      name: 'Fraska79',
      country: 'Italy',
      profit: '+6,1.81',
      tips: '16898',
    },
    {
      id: 10,
      profile: './top10profile/10.svg',
      level: '46',
      name: 'Fraska79',
      country: 'Italy',
      profit: '+6,1.81',
      tips: '16898',
    },
  ]

  return (
    <div className="top10-analisers">
      <div className='top-10-selector'>
        <select className='selector'>
          <option>Top 10</option>
          <option>Top 5</option>
          <option>Top 3</option>
          <option>Legend</option>
        </select>
      </div>

      {AnaliserItems.map((items) => (
        <div className='user-top' key={items.id}>
          <span id='user-num'>{items.id}</span>
          <div className='left'>
            <div className='profile'>
              <img src={items.profile} alt="profile" />
              <span id='level'>Level {items.level}</span>
            </div>

            <div className='name-country'>
              <span id='name'>{items.name}</span>
              <span id='country'>{items.country}</span>
            </div>
          </div>

          <div className='right'>


            <div className='top'>
              <span id='profit-count'>{items.profit}</span>
              <span id='tip-count'>{items.tips}</span>
            </div>
            <div className='bottom'>
              <span id='profit'>Profit</span>
              <span id='tip'>Tips</span>
            </div>
          </div>
        </div>
      ))}

      <div className='show-more'>
        <button>Bütün Siyahı</button>
      </div>
    </div>
  )
}

export default Top10