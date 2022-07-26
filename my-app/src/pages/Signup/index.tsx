import React from 'react'
import AuthForm from '../../componentes/AuthForm'
import server from '../../api/server'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()

  const handleRegister = async (user: string, password: string) => {
    try{
      await server.post('/security/register', {
        user,
        password
      })
      navigate('/')
    } catch (err) {
      alert('Não foi possivel criar o usuario')
    }
  }

  return (
    <AuthForm
      onSubmitForm = {handleRegister}
      onSubmitButtontext = "Cadastro"
      onRouteLink = "/"
      onRouteText = "Já tem um conta ? Faça o login"
    />
  )
}

export default Signup