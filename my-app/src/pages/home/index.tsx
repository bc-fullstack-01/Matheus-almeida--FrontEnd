import React, {useState, useEffect} from 'react'
import CustomAppBar from '../../componentes/CustomAppBar'
import server from '../../api/server'
import {Paper, CardHeader, Avatar} from '@mui/material'

interface Post {
  _id: string;
  title: string;
  description: string;
  profile: {
    name: string;
  };
}

const Home = () => {

  const token = localStorage.getItem("accessToken")
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await server.get("/feed", {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        setPosts(response.data)
      }catch(err){
        console.log(err)
      }
    }
    getPosts()
  }, [token])

  return (
    <div>
      <CustomAppBar title="Home" />
      <h1 style={{ marginTop: "100px" }}>feed</h1>
      <div>
          {posts.map((post) => (
            <Paper elevation={0}>
              <CardHeader avatar={<Avatar>B</Avatar>} title={post.title}/>
            </Paper>
          ))}
      </div>
    </div>
  )
}

export default Home