import React, { useState, useEffect } from "react";
import InifiniteScroll from "react-infinite-scroll-component";
import CustomAppBar from "../../componentes/CustomAppBar";
import server from "../../api/server";
import PostCard from "../../componentes/PostCard";
import { Divider } from "@mui/material";
import Post from "../../Models/Post";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const token = localStorage.getItem("accessToken");
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await server.get(`/feed?page=${page}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setPosts([...posts, ...response.data]);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, [token, page]);

  const loadMorePosts = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <CustomAppBar title="Home" />
      <div style={{ marginTop: "55px" }}>
        <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {posts &&
            posts.map((post) => (
              <div key={post._id}>
                <PostCard post={post} />
                <Divider />
              </div>
            ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Home;
