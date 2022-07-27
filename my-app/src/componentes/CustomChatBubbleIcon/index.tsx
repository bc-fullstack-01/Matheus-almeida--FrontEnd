import React from "react";
import { Typography, IconButton } from "@mui/material";
import { ChatBubbleOutline as ChatBubbleOutline } from "@mui/icons-material";

interface Props {
  commentCount: number;
}

const CustomChatBubbleIcon = ({ commentCount }: Props) => {
  return (
    <>
      <IconButton>
        <ChatBubbleOutline fontSize="small" />
      </IconButton>
      <Typography variant="caption" color="text.secondary">
        {commentCount}
      </Typography>
    </>
  );
};

export default CustomChatBubbleIcon;
