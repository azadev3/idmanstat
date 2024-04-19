import React, { SetStateAction } from "react";

type SelectTimeType = {
  selectTime: boolean;
  setSelectTime: React.Dispatch<SetStateAction<boolean>>;
  openTimeSelector: () => void;
  //////// function on the selected time
  timeSelected: string;
  setTimeSelected: React.Dispatch<SetStateAction<string>>;
  isTimeSelected: (value: string) => void;

  ///bottom navigator item for selected bottom navigator and rendering according to matchs
  selectedBottomNavigatorItem: number,
  setSelectedBottomNavigatorItem: React.Dispatch<SetStateAction<number>>;

  ///LOADING ANIMATION STATES:
  loadingItems: boolean,
  setLoadingItems: React.Dispatch<SetStateAction<boolean>>;

  //states for hidden & show dates; (user clicked LIVE, HOUR games then hidden the date (div classname = 'icon-calendar' hidden this.))
  hiddenCalendar: boolean,
  setHiddenCalendar: React.Dispatch<SetStateAction<boolean>>;
};

type childrenPropsType = {
  children: React.ReactNode;
};

export const SelectedTimeBottomNavComponent = React.createContext<SelectTimeType | undefined>(undefined);

export const SelectedTimeBottomNavComponentProvider: React.FC<childrenPropsType> = ({ children }) => {
  //time select section connect
  const [selectTime, setSelectTime] = React.useState<boolean>(false); //selected time boolean
  const today = new Date();
  const formattedToday = `${today.getDate().toString().padStart(2, "0")}.${(today.getMonth() + 1).toString().padStart(2, "0")}.${today.getFullYear()}`;

  const [timeSelected, setTimeSelected] = React.useState<string>(formattedToday); //selected time

  const [loadingItems, setLoadingItems] = React.useState<boolean>(false); //loading animation on bottom navigator items

  //if true open selectors
  const openTimeSelector = () => {
    setSelectTime(!selectTime);
  };

  //given time value and update selector according by time value (string);
  const isTimeSelected = (time: string) => {
    setTimeSelected(time);
  };

  //selected bottom navigator items
  const [selectedBottomNavigatorItem, setSelectedBottomNavigatorItem] = React.useState<number>(1);

  //states for hidden & show dates; (user clicked LIVE, HOUR games then hidden the date (div classname = 'icon-calendar' hidden this.))
  const [hiddenCalendar, setHiddenCalendar] = React.useState<boolean>(false);


  
  return (
    <SelectedTimeBottomNavComponent.Provider
      value={{ 
        selectTime, 
        setSelectTime, 
        timeSelected, 
        setTimeSelected, 
        isTimeSelected, 
        openTimeSelector, 
        loadingItems,
        setLoadingItems,
        selectedBottomNavigatorItem, 
        setSelectedBottomNavigatorItem,
        hiddenCalendar,
        setHiddenCalendar 
        }}>
      {children}
    </SelectedTimeBottomNavComponent.Provider>
  );
};


export const useTimeContextOnTheBottomNavComponent = () => {
  const context = React.useContext(SelectedTimeBottomNavComponent);

  if(context === undefined){
    throw new Error('bottomnav time context is undefined');
  } else {
    return context;
  }
}