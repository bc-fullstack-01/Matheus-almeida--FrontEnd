import React, {useState, useEffect} from 'react';
import {Paper, Stack, CardHeader, Divider, Typography, CardContent, Button} from '@mui/material';
import CustomAppBar from '../../componentes/CustomAppBar';
import CustomAvatar from '../../componentes/CustomAvatar'
import server from '../../api/server'

interface Profile {
  _id: string;
  name: string;
  following: string[];
  followers: string[];
}

const Profiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const token = localStorage.getItem('accessToken')
  const actualProfileId = localStorage.getItem('profile')

  useEffect(() => {
    const getProfiles = async () => {
      try{
        const response = await server.get("/profiles", {headers: {Authorization: `Bearer ${token}`}})
        setProfiles(response.data)
      }catch(err){
        console.log(err)
      }
    }
    getProfiles()
  }, [token])

  const handleFollow = async (id: string) => {
    try {
      await server.post(`/profiles/${id}/follow`, null, {
        headers: {Authorization: `Bearer ${token}`}
      })
      const newProfiles = profiles.map(profile => {
        if (profile._id === id) {
          return {
            ...profile,
            followers: [...profile.followers, id]
          }
        } else if (profile._id === actualProfileId) {
          return {
            ...profile,
            following: [...profile.following, actualProfileId],
          }
        } else {
          return profile
        }
      })
      setProfiles(newProfiles)
    } catch( err ){
      console.log(err)
    }
  }

  return (
    <div>
      <CustomAppBar title="Perfis"/>
      <div style={{marginTop: "72px"}} >
        <Stack direction="column" justifyContent="center" alignItems="strech" spacing={2} >
          {profiles.map((profile) => (
            <div key={profile._id}>
              <Paper elevation={0} >
                <CardHeader avatar={<CustomAvatar profileName={profile.name} />} title={profile.name} />
                <CardContent>
                  <Stack spacing={1}>
                    <div>
                    <Typography variant='body2' color="text.secondary">
                      {profile.followers.length} Seguidores
                    </Typography>
                    <Typography variant='body2' color="text.secondary">
                      Seguindo {profile.following.length} Perfis
                    </Typography>
                    </div>
                    <Button variant='contained' onClick={() => handleFollow(profile._id)}>
                      Seguir
                    </Button>
                  </Stack>
                </CardContent>
              </Paper>
              <Divider />
            </div>
          ))}
        </Stack>
      </div>
    </div>
  )
}

export default Profiles