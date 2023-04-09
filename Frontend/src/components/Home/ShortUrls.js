import React, { useEffect, useState } from "react";
import axios from "axios";
import CONSTANTS from "../../Constants.json";
import {Divider, Stack } from "@mui/material";
import ShortUrl from "./ShortUrl";

export default function ShortUrls({setMessageData}) {
  const [shortUrls, setShortUrls] = useState([]);
  const [deletedShortUrlId, setDeletedShortUrlsId] = useState(0);

  async function getShortUrls() {
    return axios
      .get(CONSTANTS.GET_SHORT_URLS)
      .then(function (shortUrls) {
        return shortUrls.data;
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
        setMessageData({message: "Successfully deleted" , severity: 'success'});
        setDeletedShortUrlsId(id);
      })
      .catch(function (respond) {
        setMessageData({message: respond.message , severity: 'success'});
      });
  };
  return (
    <Stack marginTop={"30px"} direction="column" justifyContent="center" alignItems="center" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
      {shortUrls.map((shortUrl) => (
        <ShortUrl
          key={shortUrl.urlId}
          shortUrl={shortUrl}
          deleteShortUrl={deleteShortUrl}
        />
      ))}
    </Stack >
  );
}