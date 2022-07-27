import React, { useEffect, useState } from "react";
import CustomFavoriteIcon from "../CustomFavoriteIcon";
import server from "../../api/server";
import CustomChatBubbleIcon from "../CustomChatBubbleIcon";

interface Props {
  commentCount: number;
  likeCount: number;
  likes: string[];
  postId: string;
}

const CustomActionIcons = ({
  commentCount,
  likeCount,
  likes,
  postId,
}: Props) => {
  const token = localStorage.getItem("accessToken");
  const profile = localStorage.getItem("profile") as string;
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likeCount);

  useEffect(() => {
    if (likes.includes(profile)) {
      setLiked(true);
    }
  }, [profile, likes]);

  const handleLike = async () => {
    try {
      if (!liked) {
        await server.post(`/posts/${postId}/like`, null, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setLiked(true);
        setLikesCount(likesCount + 1);
      } else {
        await server.post(`/posts/${postId}/unlike`, null, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setLiked(false);
        setLikesCount(likesCount - 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <CustomChatBubbleIcon commentCount={commentCount} />
      <CustomFavoriteIcon
        handleLike={handleLike}
        likeCount={likesCount}
        liked={liked}
      />
    </div>
  );
};

export default CustomActionIcons;
