import React, { useEffect, useState } from "react";
import axios from "axios";
import CONSTANTS from "../../Constants.json";
import {Divider, Stack } from "@mui/material";
import ShortUrl from "./ShortUrl";

export default function ShortUrls({updateNotificationSnackbar}) {
  const [shortUrlsData, setShortUrls] = useState([]);
  const [deletedShortUrlId, setDeletedShortUrlsId] = useState(null);

  async function getShortUrls() {
    return axios
      .get(CONSTANTS.GET_SHORT_URLS)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  useEffect(() => {
    const getShortUrlsData = async function () {
      let shortUrlsData = await getShortUrls();
      setShortUrls(shortUrlsData);
    };
    getShortUrlsData();
  }, [deletedShortUrlId]);

  const deleteShortUrl = function (id) {
    axios
      .delete(`${CONSTANTS.DELETE_SHORT_URL}/${id}`)
      .then(() => {
        updateNotificationSnackbar('Successfully deleted' , CONSTANTS.SEVERITY_SUCCESS);
        setDeletedShortUrlsId(id);
      })
      .catch(function ({response}) {
        updateNotificationSnackbar(response.data.message , CONSTANTS.SEVERITY_ERROR);
      });
  };

  const copyShortUrl = function(shortUrl){
    navigator.clipboard.writeText(shortUrl)
    updateNotificationSnackbar('Copied to clipboard' , CONSTANTS.SEVERITY_SUCCESS);
  }

  return (
    <Stack marginTop={"30px"} direction="column" justifyContent="center" alignItems="center" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
      {shortUrlsData.map((shortUrlData) => (
        <ShortUrl key={shortUrlData.urlId} shortUrlData={shortUrlData} deleteShortUrl={deleteShortUrl} copyShortUrl={copyShortUrl}/>
      ))}
    </Stack >
  );
}