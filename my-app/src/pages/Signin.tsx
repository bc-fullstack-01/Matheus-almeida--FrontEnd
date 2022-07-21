import React from 'react'
import {Container, TextField, Button, Stack} from '@mui/material'

const Signin = () => {
  return (
    <div>
      <Container maxWidth="sm">
        <Stack spacing={4}>
          <h1>Signin</h1>
          <TextField variant="outlined" label="Usuário"></TextField>
          <TextField variant="outlined" label="Senha"></TextField>
          <Button variant="contained">Login</Button>
        </Stack>
      </Container>
    </div>
  )
}

export default Signin