"use client";

import { apiClient } from "@/lib/api-client";
import VideoFeed from "./components/VideoFeed";
import { IVideo } from "@/models/Video";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([])

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        console.log("Error fetching videos", error);
      }
    };
    fetchVideos();
  }, [])


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">NextReels</h1>
      <VideoFeed videos={videos} />
    </div>
  );
}
