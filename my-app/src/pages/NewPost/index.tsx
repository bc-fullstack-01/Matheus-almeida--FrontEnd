import React, {useState, FormEvent, ChangeEvent} from 'react'
import { useNavigate } from 'react-router-dom'
import CustomAppBar from '../../componentes/CustomAppBar'
import {TextField, Stack, Container, Button} from '@mui/material'
import Dropzone from '../../componentes/Dropzone'
import server from '../../api/server'

const NewPost = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("accessToken")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const {title, description} = formData;
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    if (selectedFile){
      data.append("file", selectedFile)
    }

    try {
      const response = await server.post("/posts", data, {
        headers: {Authorization: `Bearer ${token}`},
      })
      navigate("/home")
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      <CustomAppBar title="Novo Post"/>
      <Container sx={{marginTop: 12}} >
      <form onSubmit={handleSubmit} >
        <Stack spacing={6}>
          <TextField variant="standard" label="titulo" name='title' value={formData.title} onChange={handleInputChange} />
          {selectedFile ? null : (
            <TextField variant="standard" label="o que esta acontecendo" name='description' multiline minRows={3} value={formData.description} onChange={handleInputChange} />
          )}
          <Dropzone onFileUploaded={setSelectedFile} />
          <Button variant='contained' type='submit' >Publicar</Button>
        </Stack>
      </form>
      </Container>
    </div>
  )
}

export default NewPost