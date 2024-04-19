import React from "react";
import "../../../../../styles/container/container.scss";
import LazyLoadingCountries from "../../../../loadingandlazy/LazyLoadingCountries";
const LazyLigs = React.lazy(() => import('../LeftSidebarUitils/Ligs'));

const LigsWrapper = ({searchedItems}:{searchedItems:string}) => {

  return (
    <React.Suspense fallback={<LazyLoadingCountries />}>
      <LazyLigs searchedItems={searchedItems}/>
    </React.Suspense>
  );
};

export default LigsWrapper;
