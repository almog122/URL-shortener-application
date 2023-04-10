import { Button, Input, Stack } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import CONSTANTS from "../../Constants.json";
import { Link } from 'react-router-dom';

export default function GenerateShortUrl({updateMessageData}) {

    const [newUrl, setNewUrl] = useState({originalUrl: ""});

    const updateNewUrl = function (event) {
        setNewUrl({ ...newUrl, [event.target.name]: event.target.value });
      };

      function createShortUrl() {
        axios
          .post(CONSTANTS.POST_SHORT_URL, newUrl)
          .then((response)=>{
            updateMessageData(response.data.message , CONSTANTS.SEVERITY_SUCCESS)
          })
          .catch(({response}) => {
            updateMessageData(response.data.message , CONSTANTS.SEVERITY_ERROR);
          });
      }

  return (
    <Stack margin={10} direction="column" justifyContent="center" alignItems="center" spacing={2} className="Operations">
    <Input className="newTransaction-input" name={"originalUrl"} placeholder="Url" onChange={updateNewUrl} value={newUrl.originalUrl} fullWidth/>

    <Link to={'/'}>
      <Button variant="contained" color="success" onClick={createShortUrl}> Generate short url </Button>
    </Link>

  </Stack>
  )
}
