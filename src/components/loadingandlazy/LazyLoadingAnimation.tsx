import React from "react";
import '../../styles/lazyloading.scss';

const LazyLoadingAnimation = () => {
  return (
    <div className="lazyloading-container">
      <div className="left-skeleton">
        <div className="input-skeleton">
          <input type="text" />
        </div>

        <div className="links-skeleton">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      <div className="center-skeleton">
        <div className="title">
          <li id="tit1"></li>
          <li id="tit2"></li>
        </div>

        <div className="container">
          <div className="list"></div>
          <div className="list"></div>
          <div className="list"></div>
          <div className="list"></div>
          <div className="list"></div>
        </div>
      </div>
      <div className="right-skeleton">
        <div className="list"></div>
        <div className="list"></div>
        <div className="list"></div>
        <div className="list"></div>
        <div className="list"></div>
        <div className="list"></div>
      </div>
    </div>
  );
};

export default LazyLoadingAnimation;
