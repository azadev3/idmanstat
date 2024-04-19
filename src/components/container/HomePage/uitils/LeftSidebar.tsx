import React, { ChangeEvent } from 'react'
import '../../../../styles/container/container.scss';
import Search from './LeftSidebarUitils/Search';
import LigsWrapper from './LeftSidebarUitils/LigsWrapper';
import CountryAndCups from './LeftSidebarUitils/CountryAndCups';

const LeftSidebar = () => {

  const [searchedItems, setSearchedItems] = React.useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedItems(e.target.value);
  } 

  return (
    <div className="left-sidebar">
      <Search handleSearch={handleSearch}/>
      <LigsWrapper searchedItems={searchedItems}/>
      <CountryAndCups searchedItems={searchedItems}/>
    </div>
  )
}

export default LeftSidebar