import React, { useState } from "react";

import { Grid } from "@material-ui/core";

import { SearchBar, VideoDetails, VideoList } from "./components";
import youtube from "./api/Youtube";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const API_KEY = process.env.API_KEY;

  const handlesubmit = async searchTerm => {
    const res = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 5,
        key: API_KEY,
        q: searchTerm
      }
    });
    setVideos(res.data.items);
    setSelectedVideo(res.data.items[0]);
  };

  const onVideoSelect = video => {
    setSelectedVideo(video);
  };

  return (
    <Grid justify="center" container spacing={10}>
      <Grid item xs={12}>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <SearchBar onFormSubmit={handlesubmit} />
          </Grid>
          <Grid item xs={8}>
            <VideoDetails video={selectedVideo} />
          </Grid>
          <Grid item xs={4}>
            <VideoList videos={videos} onVideoSelect={onVideoSelect} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
