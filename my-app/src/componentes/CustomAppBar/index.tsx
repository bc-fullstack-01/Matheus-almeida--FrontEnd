import React, {useEffect, useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import io from 'socket.io-client'
import {AppBar, Toolbar, Typography, Box, IconButton, Badge} from '@mui/material'
import {Home as HomeIcon, Edit as EditIcon, Group as GroupIcon, AccountCircle as AccountCircleIcon, Email as EmailIcon} from '@mui/icons-material'
import CustomIconButton from '../CustomIconButton'

interface Props {
  title: string;
}

const CustomAppBar = ({title}: Props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken')
  const [messageCount, setMessageCount] = useState(0)

  const socket = io("http://localhost:4000/v1", {
    auth: {token},
  })

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket);
    })
    socket.on("connect_profile", (profile) => {
      console.log(profile)
    })
    socket.on("disconnect", () => {
      console.log(socket)
    })
    socket.on("post", (data) => {
      console.log(data)
      setMessageCount((count) => count + 1)
    })
    socket.on("post-like", (data) => {
      console.log(data)
      setMessageCount((count) => count + 1)
    })
    socket.on("comment", (data) => {
      console.log(data)
      setMessageCount((count) => count + 1)
    })
    socket.on("comment-like", (data) => {
      console.log(data)
      setMessageCount((count) => count + 1)
    })
    socket.on("connect_error", (err) => {
      console.error(err)
    })
    return () => {
      socket.off()
    }
  }, [token, socket])

  const handleClickEmail = () => {
    if (messageCount) {
      setMessageCount(0)
      window.location.reload()
    }
  }

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Typography
          variant='h5'
          noWrap
          component='div'
          sx={{display: {xs: 'none', sm: 'block'}}}
        >
          {title}
        </Typography>
        <Box sx={{flexGrow:1}}/>
        <Box sx={{display: {xs: "none", md: "flex"}}}>
          <CustomIconButton label="show home" onClickCallback={() => navigate('/home')}>
            <HomeIcon/>
          </CustomIconButton>
          <CustomIconButton label="notifications" onClickCallback={handleClickEmail}>
            <Badge badgeContent={messageCount} color="secondary">
              <EmailIcon/>
            </Badge>
          </CustomIconButton>
          <CustomIconButton label="show edit" onClickCallback={() => navigate('/create')}>
            <EditIcon/>
          </CustomIconButton>
          <CustomIconButton label="show profiles" onClickCallback={() => navigate('/profiles')}>
            <GroupIcon/>
          </CustomIconButton>
          <CustomIconButton label="show profile" onClickCallback={() => navigate('/profile')}>
            <AccountCircleIcon/>
          </CustomIconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default CustomAppBar
