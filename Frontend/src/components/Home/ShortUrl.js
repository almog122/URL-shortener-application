import React from 'react'
import CONSTANTS from "../../Constants.json";
import { Button, Grid, Typography } from '@mui/material'

export default function ShortUrl({shortUrlData , clickOnDeleteButton , clickOnCopyButton} ) {

  const getDomainName = function(){
    let domain = (new URL(shortUrlData.originalUrl));
    let domainName = domain.hostname;
    return domainName
  }

  return (
    <Grid container direction={'row'} boxShadow={2} spacing={2} justifyContent="center" alignItems="center" maxWidth="md">

      <Grid item xs={5}>
        <img width={20} height={20} src={shortUrlData.domainImg} alt=''/>
        <Typography display={'inline-block'}> {getDomainName()}</Typography>
      </Grid>

      <Grid item xs={5}>
        <a href={`${shortUrlData.shortUrl}`} target='_blank' rel="noreferrer"> {CONSTANTS.SHORT_URL_lY}{shortUrlData.urlId} </a>
      </Grid>

      <Grid item xs={5}>
        <img src={shortUrlData.qrCode} alt='' />
      </Grid>
      <Grid item xs={5}>
        <Button variant="contained" color="error" onClick={() => clickOnDeleteButton(shortUrlData.urlId)}> Delete </Button>
        <Button variant="contained" onClick={() => clickOnCopyButton(shortUrlData.shortUrl)}>Copy</Button>
      </Grid>
    </Grid>
  )
}
