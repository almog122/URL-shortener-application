import React from 'react'
import CONSTANTS from "../../Constants.json";
import { Button, Grid, Typography } from '@mui/material'

export default function ShortUrl({shortUrl , deleteShortUrl}) {

  const getDomainName = function(){
    let domain = (new URL(shortUrl.originalUrl));
    let domainName = domain.hostname;
    return domainName
  }

  // const getDomainName = function(){
  //   let domain = (new URL(shortUrl.originalUrl));
  //   let domainName = domain.hostname;
  //   return domainName
  // }

  return (
    <Grid container direction={'row'} boxShadow={2} spacing={2} justifyContent="center" alignItems="center" width={'80%'}>

      <Grid item xs={6}>
        <Typography > {getDomainName()}</Typography>
      </Grid>

      <Grid item xs={6}>
        <a href={`${shortUrl.shortUrl}`} target='_blank' rel="noreferrer"> {CONSTANTS.SHORT_URL_lY}{shortUrl.urlId} </a>
      </Grid>

      <Grid item xs={2}>
        <Button variant="contained" color="error" onClick={() => deleteShortUrl(shortUrl.urlId)}> Delete </Button>
      </Grid>
    </Grid>
  )
}
