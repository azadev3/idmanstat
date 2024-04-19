import React from 'react'
import '../../../../../styles/container/container.scss'
import ActiveCupsResponsiveComponent from './ActiveCupsResponsiveComponent'

export type ActiveCuponTypes = {
     id: number,
     gameresult: string,
     teamname: string,
     teamname2: string,
     teamicon: string,
     teamicon2: string,
     ligname: string,
     time: string,
     date: string,
     coefficient: string,
}

const ActiveCups = () => {

     const ActiveCuponItems:ActiveCuponTypes[] = [
          {
               id: 1,
               gameresult: '1X',
               teamname: 'Getafe',
               teamname2: 'Villareal',
               teamicon: './villareal.svg',
               teamicon2: './villareal.svg',
               ligname: 'Futbol / La Liga',
               time: '00:13:22',
               date: '30 Sentyabr 16:00',
               coefficient: '4.5',
          },
          {
               id: 2,
               gameresult: '1X',
               teamname: 'Getafe',
               teamname2: 'Villareal',
               teamicon: './villareal.svg',
               teamicon2: './villareal.svg',
               ligname: 'Futbol / La Liga',
               time: '00:13:22',
               date: '30 Sentyabr 16:00',
               coefficient: '4.5',
          },
          {
               id: 3,
               gameresult: '1X',
               teamname: 'Getafe',
               teamname2: 'Villareal',
               teamicon: './villareal.svg',
               teamicon2: './villareal.svg',
               ligname: 'Futbol / La Liga',
               time: '00:13:22',
               date: '30 Sentyabr 16:00',
               coefficient: '4.5',
          },
     ]

     //if screen size shorted is 568px update active-cups-today styles on custom styles
     const [activeCupsResponsive, setActiveCupsResponsive] = React.useState<boolean>(false);
     React.useEffect(() => {
          const responsiveAcCupScreen = () => {
               if(window.innerWidth <= 568) {
                    setActiveCupsResponsive(true);
               } else {
                    setActiveCupsResponsive(false);
               }
          }

          responsiveAcCupScreen();

          window.addEventListener('resize', responsiveAcCupScreen);
          return () => window.removeEventListener('resize', responsiveAcCupScreen);
     }, [activeCupsResponsive]);

  return (
     <React.Fragment>
     {activeCupsResponsive ? (
          <ActiveCupsResponsiveComponent />
     ):(
         <div className="active-cups-today">
     <div className='top-title'>
          <img src='azflag.svg' alt='azerbaijan-flag' />
          <span>Bu gün üçün aktiv kuponlar</span> 
     </div>
      {ActiveCuponItems.map((items) => (
          <div className='cupons' key={items.id}>
               <div className='left-coefficients'>
                <div className='coefficient'>
                    <span>{items.coefficient} <span>əmsal</span></span>
                </div>
               </div>

               <div className='center-teams'>
                    <div className='top'>
                         <div className='left-team'>
                         <img src={items.teamicon} alt='team1' />
                         <span>{items.teamname}</span>
                         </div>

                         <div className='center-timedate'>
                         <span>{items.ligname}</span>
                         <span style={{fontWeight: '600', fontSize: '15px', color: 'darkslategrey'}}>{items.time}</span>
                         <span>{items.date}</span>
                         </div>

                         <div className='right-team'>
                         <img src={items.teamicon2} alt='team2' />
                         <span>{items.teamname2}</span>
                         </div>
                    </div>
                    <div className='game-result'>
                         <span>Oyunun Ümumi Nəticəsi: {items.gameresult}</span>
                    </div>
               </div>

               {/* <div className='right-play-button'>
                    <button>Oyna</button>
               </div> */}
          </div>
      ))}
         </div>
     )}
    </React.Fragment>

  )
}

export default ActiveCups