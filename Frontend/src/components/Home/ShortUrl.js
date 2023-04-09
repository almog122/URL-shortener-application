import React from 'react'
import { Button, Grid, Typography } from '@mui/material'

export default function ShortUrl({shortUrl , deleteShortUrl}) {

  return (
    <Grid container boxShadow={2} spacing={2} justifyContent="center" alignItems="center" width={"400px"}>

      <Grid item xs={6}>
        <Typography > original Url : {shortUrl.originalUrl}</Typography>
        <Typography > short Url : {shortUrl.shortUrl}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Button variant="contained" color="error" onClick={() => deleteShortUrl(shortUrl._id)}> Delete </Button>
      </Grid>
    </Grid>
  )
}
