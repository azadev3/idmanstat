import React from "react";
import "../../../../../styles/container/container.scss";
import { useTimeContextOnTheBottomNavComponent } from "./BottomNavContext";
import { FaEarthAfrica } from "react-icons/fa6";
import { MdAccessAlarms } from "react-icons/md";
import { TbClockHour5 } from "react-icons/tb";
import { useLiveGamesContext } from "./ContentRoutes/GamesApiContext";

type LeftareaItemsType = {
  id: number;
  title: string;
  notification?: string;
  icon: any;
};

const BottomNav = () => {

  const { liveGamesData } = useLiveGamesContext();

  const LeftareaItems: LeftareaItemsType[] = [
    {
      id: 1,
      title: "Hamısı",
      notification: "23",
      icon: <FaEarthAfrica id="icon"/>,
    },
    {
      id: 2,
      title: "Canlı",
      notification: "23",
      icon: <MdAccessAlarms id="icon"/>,
    },
    {
      id: 3,
      title: "Saat",
      icon: <TbClockHour5 id="icon"/>,
    },
  ];

  const [timeList, setTimeList] = React.useState<string[]>([]);

  //conver time today, lastweek, nextweek (7day after - before)
  const convertTimes = () => {
    const today = new Date();
    const formattedTimes = [];

    for (let i = -7; i <= 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      const options: any = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };
      let formattedTime = currentDate.toLocaleString("tr-AZ", options);

      formattedTimes.push(formattedTime);
    }
    setTimeList(formattedTimes);
  };

  React.useEffect(() => {
    convertTimes();
  }, []);

  const { 
    isTimeSelected, timeSelected, openTimeSelector, selectTime, 
    setLoadingItems, hiddenCalendar,
    selectedBottomNavigatorItem, setSelectedBottomNavigatorItem } = 
    useTimeContextOnTheBottomNavComponent();
  
  const handleSelectBottomNavItem = (id: number) => {
    setSelectedBottomNavigatorItem(id);
    setLoadingItems(true);

    const timeOut:NodeJS.Timeout = setTimeout(() => {
      setLoadingItems(false);
    }, 550);

    return () => clearTimeout(timeOut);
  }


  return (
    <div className="bottom-navigation">
      <div className="left-area">
        {LeftareaItems.map((items) => (
          <li key={items.id} className={`links ${selectedBottomNavigatorItem === items.id ? 'active' : ''}`}
          onClick={() => handleSelectBottomNavItem(items.id)}
          >
            {items.icon}
            <span id="title-links">{items.title}</span>
            {
            items.id === 1 && selectedBottomNavigatorItem === items.id  ?
            <span id="notification">{liveGamesData.length === 0 ? '-' : liveGamesData.length}</span> : 
            items.id === 2 && selectedBottomNavigatorItem === items.id ? <span id="notification">{liveGamesData.length === 0 ? '-' : liveGamesData.length}</span> :
            items.id === 3 && selectedBottomNavigatorItem === items.id ? <span id="notification">{liveGamesData.length === 0 ? '-' : liveGamesData.length}</span> : <span id="notification">'-'</span>
            }
          </li>
        ))}
      </div>

      <div className="time">
        <div className="icon-calendar" onClick={openTimeSelector} style={{visibility: hiddenCalendar ? 'hidden' : 'visible'}}>
          <img src="./calendar.svg" alt="calendar-icon" loading="lazy" />
          {/* if time selected show in icon-calendar selected time */}
          {timeSelected && <span id="selectedtime">{timeSelected}</span>}
          {/* if true selectTime clicked icon-calendar and open dropdown menu, selector menu */}
          {selectTime && (
            <div className="selectors">
              {timeList.map((time, index) => (
                <li key={index} onClick={() => isTimeSelected(time)}>
                  {index === 7 ? <span style={{ color: "#252e4e", fontWeight: "600" }}>Bu gün</span> : time}
                </li>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
