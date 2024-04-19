import React from 'react'
import '../../../../styles/container/container.scss';
import Header from './ContentUitils/Header';
import BottomNav from './ContentUitils/BottomNav';
import LiveGames from './ContentUitils/LiveGames';
import { useNavigatorContext } from '../../../../context/NavigatorContextOnTheContentItems';

const Content = () => {
  const { navigator } = useNavigatorContext();
  return (
    <div className="content">
      {navigator === 'oyunlar' ? (
        <React.Fragment>
        <Header />
        <BottomNav />
        <LiveGames />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Header />
          <LiveGames />
        </React.Fragment>
      )}
    </div>
  )
}

export default Content