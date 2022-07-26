import React, { useEffect, useState } from "react";
import { Typography, IconButton } from "@mui/material";
import {
  ChatBubbleOutline as ChatBubbleOutline,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";

interface Props {
  commentCount: number;
  likeCount: number;
  likes: string[];
}

const CustomActionIcon = ({ commentCount, likeCount, likes }: Props) => {
  const profile = localStorage.getItem("profile") as string;
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (likes.includes(profile)) {
      setLiked(true);
    }
  }, [profile, likes]);

  return (
    <div>
      <IconButton>
        <ChatBubbleOutline fontSize="small" />
      </IconButton>
      <Typography variant="caption" color="text.secondary">
        {commentCount}
      </Typography>
      <IconButton>
        {liked ? (
          <FavoriteIcon fontSize="small" />
        ) : (
          <FavoriteBorderIcon fontSize="small" />
        )}
      </IconButton>
      <Typography variant="caption" color="text.secondary">
        {likeCount}
      </Typography>
    </div>
  );
};

export default CustomActionIcon;
