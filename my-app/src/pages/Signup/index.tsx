import React from 'react'
import AuthForm from '../../componentes/AuthForm'

const Signup = () => {
  const handleRegister = () => {

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