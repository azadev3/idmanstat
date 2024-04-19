import React from "react";
import "../../../../styles/tipspage/addtipmodal.scss";
import AddTipModalHeader from "./addtipmodaluitils/AddTipModalHeader";
import { IoSearch } from "react-icons/io5";
import SelectedLig from "./addtipmodaluitils/SelectedLig";
import SelectedMatch from "./addtipmodaluitils/SelectedMatch";
import { usePostTipModal } from "../../../../context/PostTipModalContext";
import PostTipModal from "./addtipmodaluitils/PostTipModal";
const LazyLigs = React.lazy(() => import("./addtipmodaluitils/Ligs"));

const AddTipModal = () => {
  //set lig and open lig results
  const [selectedlig, setSelectedLig] = React.useState<string | null>(null);

  //other items at selected ligs
  const [leagueImage, setLeagueImage] = React.useState<string | null>(null);
  const [leagueType, setLeagueType] = React.useState<string | null>(null);

  //lig ID
  const [leagueID, setLeagueID] = React.useState<number | null>(null);

  //search ligs
  const [searchedItems, setSearchedItems] = React.useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedItems(e.target.value);
  };

  //selectedmatch (SelectedLig.tsx component)
  const [selectedmatch, setSelectedMatch] = React.useState<number | null>(null);
  const { postTipModal } = usePostTipModal();

  React.useEffect(() => {
    console.log(selectedlig);
  }, [selectedlig])

  return (
    <div className="add-tipmodal-container" style={{paddingBottom: postTipModal ? '75px' : ''}}>
      <AddTipModalHeader
        setSelectedLig={setSelectedLig} //we given this, because user click icon and come to back
        selectedlig={selectedlig}
        selectedmatch={selectedmatch}
        setSelectedMatch={setSelectedMatch}
      />

      {selectedmatch ? (
        <SelectedMatch selectedlig={selectedlig}/>
      ) : (
        <React.Fragment>
          <div className="search-area">
            <div className="input-search">
              <input onChange={handleSearch} type="search" placeholder="Uyğun liganı/maçı axtar" />
              <IoSearch id="searchicon" />
            </div>
          </div>

          {selectedlig ? (
            <SelectedLig
              selectedlig={selectedlig}
              leagueImage={leagueImage}
              leagueType={leagueType}
              setSelectedMatch={setSelectedMatch}
              leagueID={leagueID}
            />
          ) : (
            <div className="popular-lig-container">
              <div className="toptitle">
                <span>Seçimləri İzlə</span>
              </div>

              <div className="ligs-content">
                <article className="title">
                  <span>Məşhur Ligalar</span>
                </article>

                <div className="ligs">
                  <React.Suspense fallback="loading data...">
                    <LazyLigs
                      searchedItems={searchedItems} //search state given the props
                      setSelectedLig={setSelectedLig} //this keeps the selected league
                      setLeagueType={setLeagueType} //this keeps the selected league country
                      setLeagueImage={setLeagueImage} //this keeps the selected league image
                      setLeagueID={setLeagueID} //this keeps the selected league ID
                    />
                  </React.Suspense>
                </div>
              </div>
            </div>
          )}
        </React.Fragment>
      )}

      {postTipModal && <PostTipModal selectedlig={selectedlig}/>}
    </div>
  );
};

export default AddTipModal;
