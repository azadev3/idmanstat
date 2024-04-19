import React from "react";
import "../../styles/lazyloading.scss";

const LazyLoadingTeamItemsAnim = () => {
  return (
    <div className="lazyloading-teams">
      {[...Array(20)].map((_, index) => (
          <div key={index}>
               <div id="img"></div>
               <span id="field"></span>
               <span id="field2"></span>
          </div>
      ))}
    </div>
  );
};

export default LazyLoadingTeamItemsAnim;
