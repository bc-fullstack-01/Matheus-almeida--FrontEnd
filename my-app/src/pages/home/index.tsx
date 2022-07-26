import React, { useState, useEffect } from "react";
import CustomAppBar from "../../componentes/CustomAppBar";
import server from "../../api/server";
import PostCard from "../../componentes/PostCard";
import { Divider } from "@mui/material";
import Post from "../../Models/Post";

const Home = () => {
  const token = localStorage.getItem("accessToken");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await server.get("/feed", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, [token]);

  return (
    <div>
      <CustomAppBar title="Home" />
      <div style={{ marginTop: "24px" }}>
        {posts.map((post) => (
          <div key={post._id}>
            <PostCard post={post} />
            <Divider />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
