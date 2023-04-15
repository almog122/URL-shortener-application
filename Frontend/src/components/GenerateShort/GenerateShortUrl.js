import { Button, Container, Input, Stack } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import CONSTANTS from "../../Constants.json";
import { Link } from 'react-router-dom';

export default function GenerateShortUrl({updateNotificationSnackbar}) {

  const [newUrl, setNewUrl] = useState({originalUrl: ""});

  const updateNewUrl = function (event) {
    setNewUrl({ ...newUrl, [event.target.name]: event.target.value });
  };

  const isUrlContainHttps = function (){
    if (newUrl.originalUrl.indexOf("https://") === -1) {
      return false
    }
    return true
  }

  function createShortUrl() {
    axios
      .post(CONSTANTS.POST_SHORT_URL, isUrlContainHttps() ? newUrl : {...newUrl , originalUrl: "https://" + newUrl.originalUrl }  )
      .then((response)=>{
        updateNotificationSnackbar(response.data.message , CONSTANTS.SEVERITY_SUCCESS)
      })
      .catch(({response}) => {
        updateNotificationSnackbar(response.data.message , CONSTANTS.SEVERITY_ERROR);
      });
  }

  return (
    <Container>
      <Stack margin={10} direction="column" justifyContent="center" alignItems="center" spacing={2}>
      <Input className="newTransaction-input" name={"originalUrl"} placeholder="https://github.com/ or www.github.com" onChange={updateNewUrl} value={newUrl.originalUrl} fullWidth/>

      <Link to={'/'}>
        <Button variant="contained" color="success" onClick={createShortUrl}> Generate short url </Button>
      </Link>

    </Stack>
  </Container>
  )
}
