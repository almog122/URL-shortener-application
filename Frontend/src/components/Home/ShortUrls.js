import React, { useEffect, useState } from "react";
import axios from "axios";
import CONSTANTS from "../../Constants.json";
import {Divider, Stack } from "@mui/material";
import ShortUrl from "./ShortUrl";

export default function ShortUrls({updateMessageData}) {
  const [shortUrlsData, setShortUrls] = useState([]);
  const [deletedShortUrlId, setDeletedShortUrlsId] = useState(0);

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

  const clickOnDeleteButton = function (id) {
    axios
      .delete(`${CONSTANTS.DELETE_SHORT_URL}/${id}`)
      .then(() => {
        updateMessageData('Successfully deleted' , CONSTANTS.SEVERITY_SUCCESS);
        setDeletedShortUrlsId(id);
      })
      .catch(function ({response}) {
        updateMessageData(response.data.message , CONSTANTS.SEVERITY_ERROR);
      });
  };

  const clickOnCopyButton = function(shortUrl){
    navigator.clipboard.writeText(shortUrl)
    updateMessageData('Copied to clipboard' , CONSTANTS.SEVERITY_SUCCESS);
  }

  return (
    <Stack marginTop={"30px"} direction="column" justifyContent="center" alignItems="center" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
      {shortUrlsData.map((shortUrlData) => (
        <ShortUrl key={shortUrlData.urlId} shortUrlData={shortUrlData} clickOnDeleteButton={clickOnDeleteButton} clickOnCopyButton={clickOnCopyButton}/>
      ))}
    </Stack >
  );
}