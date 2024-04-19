import React from "react";
import "../../../../styles/newspage/news.scss";
import { CiTimer } from "react-icons/ci";
import LikeAndComment from "../../LikeAndComment";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiModal from "../../EmojiModal";
import NewsContent from "./NewsContent";



const News = () => {
 


  return (
    <div className="news-container-in-newspage">
      <NewsContent />
    </div>
  );
};

export default News;
