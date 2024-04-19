import React from "react";
import "../../../../../styles/container/container.scss";
import LazyLoadingCountries from "../../../../loadingandlazy/LazyLoadingCountries";
const LazyCountries = React.lazy(() => import('../LeftSidebarUitils/Countries'));

const CountryAndCups = ({searchedItems}:{searchedItems:string}) => {

  //if button clicked setShowedMore given the TRUE value;
  const [showedMore, setShowedMore] = React.useState<boolean>(false);
  const handleShowMoreCountries = () => {
    setShowedMore(true);
  }

  return (
    <div className="country-and-cups-sidebar">
      <div className="top-title">
        <strong id="title">Ölkələr və Kuboklar</strong>
      </div>
      <React.Suspense fallback={<LazyLoadingCountries />}>
        <LazyCountries 
        showedMore={showedMore}
        searchedItems={searchedItems}
        />
      </React.Suspense>

      {/* show more button for countries */}
      {showedMore ? (
        ""
      ):(
        <button 
        style={{display: searchedItems ? 'none' : ''}}
        className="show-more-countries" onClick={handleShowMoreCountries}>
        Daha Çoxuna Bax
        </button>
      )}
    </div>
  );
};

export default CountryAndCups;
 