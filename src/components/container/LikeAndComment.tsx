import React from "react";
import { FaShare } from "react-icons/fa";
import { LiaCommentSolid } from "react-icons/lia";
import { SlDislike, SlLike } from "react-icons/sl";
import '../../styles/global.scss';

const LikeAndComment = () => {
  return (
    <div className="like-and-comment">
      <div className="likes">
        <SlLike id="likeicon" />
        <SlDislike id="disslikeicon" />
      </div>

      <div className="comment-and-share">
        <div className="comment">
          <LiaCommentSolid id="commenticon" />
          <span>Şərh</span>
        </div>

        <div className="share">
          <FaShare id="shareicon" />
        </div>
      </div>
    </div>
  );
};

export default LikeAndComment;
