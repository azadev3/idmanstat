import React, { ChangeEvent } from "react";
import "../../../styles/loginregister/optionspage.scss";
import { FaChevronLeft } from "react-icons/fa6";
import { useRegisterContext } from "../../../context/RegisterContext";
import { useTeamSelectModal } from "../../../context/RegisterOptionContext";
import { useLigApi } from "../../../context/LigContext";
import { VList } from "virtua";
import { FaRegStar } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { FaSquareCheck } from "react-icons/fa6";
import { useChangedBoolean } from "../../../context/IsChanged";
import { TiDelete } from "react-icons/ti";


const LigModal = () => {
  //popup true
  const { setNavRegister } = useRegisterContext();
  const { setLigModal } = useTeamSelectModal();

  //is changed boolean value
  const { isChanged } = useChangedBoolean();

  //get back to favourite teams selection
  //if user exiting get back to the
  //(favorit team or favorit lig, then setPageChanged true because user get back);
  const GetBack = () => {
    setLigModal(false);
    setNavRegister("Tebrikler");
  };

  //get main leagues and leagues on LigContext; (see: src > components > context > LigContext.tsx)
  const { mainLigs, leagues } = useLigApi();

  //if user clicked Meshur Liqalar ? open new main leagues
  const [mainLeaguesComponent, setMainLeaguesComponent] = React.useState<boolean>(false);
  const getMainLeagues = () => {
    setMainLeaguesComponent((prevComponent) => !prevComponent);
  };

  //search system on Ligmodal
  const [searchValue, setSearchValue] = React.useState<string>("");

  const userHandleSearching = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchingValue = e.target.value;
    setSearchValue(searchingValue);
  };

  //added favourite league function and states
  const [addedLeague, setAddedLeague] = React.useState<[string, string][]>([]);

  //if user clicked + icon and added fav lig changed 'okay' some icon
  const [changedIcon, setChangedIcon] = React.useState<{[key:string]: boolean}>({});

  //max league number
  const acceptMaxLeagueAdded:number = 20;

  React.useEffect(() => {
    const storedLeagues = localStorage.getItem("favligs");
    const leaguesindex = leagues.map((item:any, index:any) => index.toString());
    if (storedLeagues) {
      setAddedLeague(JSON.parse(storedLeagues));
      setChangedIcon((prevchanged) => {
        const updatedIcon = { ...prevchanged };
        leaguesindex.forEach((index:string) => {
          updatedIcon[index] = true;
        });
        return updatedIcon;
      })
    }

  }, []);

  const saveToLocalStorage = (leagues: [string, string][]) => {
    localStorage.setItem("favligs", JSON.stringify(leagues));
  };

  const addFavLeague = (lig: string, logo: string, index: string) => {
    if (addedLeague.length < acceptMaxLeagueAdded) {
      setAddedLeague((prevleague) =>
        prevleague.some((liga) => liga[0] === lig || liga[1] === logo)
          ? prevleague
          : [...prevleague, [lig, logo]]
      );
      setChangedIcon((prevIcon) => ({
        ...prevIcon,
        [index]: true
      }));
    } else {
      setChangedIcon((prevIcon) => ({
        ...prevIcon,
        [index]: false
      }));
    }
  };

  React.useEffect(() => {
    saveToLocalStorage(addedLeague);
  }, [addedLeague]);


  //deleted fav lig
  const [deleted, setDeleted] = React.useState<{[key:string]: boolean}>({});

  const deletedFavLig = (index:string) => {
    setDeleted((prevdel) => ({
      ...prevdel,
      [index]: true
    }));

    setAddedLeague((prevleague) => {
      return prevleague.filter((lig, i) => i.toString() !== index)
    });
  }

  React.useEffect(() => {
    const favteams:any = localStorage.getItem('favligs');
    const favteamsData = JSON.parse(favteams);
    localStorage.removeItem(favteamsData);
    localStorage.setItem('favligs', JSON.stringify(addedLeague));
  }, [deleted, addedLeague]);
 
  return (
    <div className="select-lig-popup">
      <div className="top-header-in-selecteampopup">
        <article className="selecteam-title">
          <span>liqa seçiminizi edin</span>
        </article>

        <article className="little-title-and-icon">
          <FaChevronLeft
            id="lefticon"
            onClick={() => GetBack()} //if user get back, back to popup modal
          />
          <p>
            Hesabınıza <strong>20</strong> favorit liqa əlavə edə bilərsiniz. Hal-hazırda 
            <strong style={{paddingLeft: addedLeague ? '5px' : ''}}>
              {addedLeague ? addedLeague.length : '0'}
            </strong> liqa əlavə
            etmisiniz.
          </p>
        </article>
      </div>

      <div className="teams-container">
        <div className="search-input">
          <div className="input-area">
            <IoSearch id="searchicon" />
            <input type="search" placeholder="Komandanı axtar" onChange={userHandleSearching} value={searchValue} />
          </div>
        </div>

        <div className="teams">
          {/* if user clicked main leagues render always main ligs*/}
          {mainLeaguesComponent ? (
            <div className="main-leagues-container">
              <div className="header-back-area">
                <div className="icon-getback" onClick={() => setMainLeaguesComponent(false)}>
                  <IoIosArrowBack className="get-back-inmainleagues" />
                  <span>Geri qayıt</span>
                </div>
              </div>

              <div className="leagues">
                <VList>
                  {mainLigs
                    .filter((league) => league.name.toLowerCase().includes(searchValue.toLowerCase()))
                    .map((popularligs, index) => (
                      <div className="teams-other" key={index}>
                        <div className="left">
                          <div className="image-wrapper">
                            <img src={popularligs.logo} alt="xəta.." />
                          </div>
                          <span>{popularligs.name}</span>
                        </div>

                        <div className="right">
                        {changedIcon[index] && addedLeague.some(item => item[0] === popularligs.name && item[1] === popularligs.logo) ? (
                        <React.Fragment>
                          {isChanged && <TiDelete id="delete-icon-fav-lig" onClick={() => deletedFavLig(index.toString())}/>}
                        <FaSquareCheck id="added-fav-lig-success"/>
                        </React.Fragment>
                        ) : (
                        <React.Fragment>
                          {deleted[index] ?
                            <IoAdd id="add-fav-lig-icon" onClick={() => addFavLeague(popularligs.name, popularligs.logo, index.toString())}/>
                          : <IoAdd id="add-fav-lig-icon" onClick={() => addFavLeague(popularligs.name, popularligs.logo, index.toString())}/>
                          }
                        </React.Fragment>
                        )}
                        </div>
                      </div>
                    ))}
                </VList>
              </div>
            </div>
          ) : (
            <React.Fragment>
              <div className="popular-teams">
                <div className="left">
                  <div className="image-wrapper">
                    <FaRegStar id="staricon" />
                  </div>
                  <span onClick={getMainLeagues}>Məşhur Liqalar</span>
                </div>

                <div className="right">
                  <img src="./righticon.svg" alt="righticon" id="righticon" onClick={getMainLeagues} />
                </div>
              </div>
              <VList style={{ height: "430px" }}>
                {leagues
                  .filter((ligs) => ligs.name.toLowerCase().includes(searchValue.toLowerCase()))
                  .map((ligs, index) => (
                    <div className="teams-other" key={index}>
                      <div className="left">
                        <div className="image-wrapper">
                          <img src={ligs.logo} alt="xəta.." />
                        </div>
                        <span>{ligs.name}</span>
                      </div>
                        <div className="right">
                        {changedIcon[index] && addedLeague.some(item => item[0] === ligs.name && item[1] === ligs.logo) ? (
                        <React.Fragment>
                          {isChanged && <TiDelete id="delete-icon-fav-lig" onClick={() => deletedFavLig(index.toString())}/>}
                        <FaSquareCheck id="added-fav-lig-success"/>
                        </React.Fragment>
                        ) : (
                        <React.Fragment>
                          {deleted[index] ?
                            <IoAdd id="add-fav-lig-icon" onClick={() => addFavLeague(ligs.name, ligs.logo, index.toString())}/>
                          : <IoAdd id="add-fav-lig-icon" onClick={() => addFavLeague(ligs.name, ligs.logo, index.toString())}/>
                          }
                        </React.Fragment>
                        )}
                        </div>
                    </div>
                  ))}
              </VList>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default LigModal;
