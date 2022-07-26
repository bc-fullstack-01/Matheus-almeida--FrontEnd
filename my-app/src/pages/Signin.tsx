import React from 'react'
import {useNavigate, Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import server from './../api/server'
import AuthForm from '../componentes/AuthForm'

interface TokenUser {
  user: string;
  profile: string;
}

const Signin = () => {
  const navigate = useNavigate()

  const handleLogin = async (user:string, password:string) => {
    try {
      const response = await server.post('/security/login', {
        user,
        password,
      })
      const {accessToken} = response.data
      localStorage.setItem('accessToken', accessToken)
      const decoded = jwt_decode(accessToken) as TokenUser
      localStorage.setItem("user", decoded.user)
      localStorage.setItem("profile", decoded.profile)
      navigate('/home')
    }catch(err){
      alert("Ocorreu um erro no login")
    }
  }

  return (
    <div>
      <AuthForm
      onSubmitForm = {handleLogin}
      onSubmitButtontext = "Login"
      onRouteLink = "register"
      onRouteText = "Não tem uma conta ? Faça o cadastro"
      />
    </div>
  )
}

export default Signin