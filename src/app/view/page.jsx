'use client'

import Header from "../Components/Header"
import Footer from "../Components/Footer"
import VideoPreviewCard from "../Components/VideoPreviewCard";
import { useEffect, useState } from "react";

export default function View() {

    // const list = ['test','test2','test3'];
    const [data, setData] = useState([]);

    useEffect(() => {
    fetch('http://localhost:3000/api/videos')
        .then((res) => res.json())
        .then((data) => {
            setData(data.videos);
        });
    }, []);

    console.log(data);

    return(
        <>
            <Header />
            <div className="main">
                <p>View Uploaded Videos</p>
                {/* call api on display, get the file paths to each video
                for loop, for each video from api return make a new video to display each video */}
                {data.map((el, idx) => (
                    <VideoPreviewCard props={el} key={idx} />
                ))}
            </div>
            <Footer />
        </>
    )
}