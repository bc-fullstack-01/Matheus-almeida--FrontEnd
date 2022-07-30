import React from 'react'
import CustomAppBar from '../../componentes/CustomAppBar'
import {Box, Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const userName = localStorage.getItem('user')
  const handleLogout = () => {
    localStorage.clear()

    navigate('/')
  }

  return (
    <div>
      <CustomAppBar title="Perfil"/>
      <Box component="main" sx={{flexGrow: 1, p: 3, marginTop: 8}}>
        <h1>{userName}</h1>
        <Button variant='contained' onClick={handleLogout}>
          Sair
        </Button>
      </Box>
    </div>
  )
}

export default Profile