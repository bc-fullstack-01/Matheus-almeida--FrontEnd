import React from 'react'
import CustomAppBar from '../../componentes/CustomAppBar'
import {TextField, Stack, Container, Button} from '@mui/material'
import Dropzone from '../../componentes/Dropzone'

const NewPost = () => {
  return (
    <div>
      <CustomAppBar title="Novo Post"/>
      <Container sx={{marginTop: 12}} >
        <Stack spacing={6}>
          <TextField variant="standard" label="titulo" name='title' />
          <TextField variant="standard" label="o que esta acontecendo" name='description' multiline minRows={3} />
          <Dropzone onFileUploaded={() => {}} />
          <Button variant='contained' type='submit' >Publicar</Button>
        </Stack>
      </Container>
    </div>
  )
}

export default NewPost