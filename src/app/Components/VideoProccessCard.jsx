'use client'

import { useEffect, useState } from "react";

export default function VideoProcessCard({props}) {

    const [status, setStatus] = useState("Processing")
    
    const [thumbnail, setThumbnail] = useState(null);
    
        useEffect(() => {
            // use props to use api link to return thumbail for each video
            fetch(`http://localhost:3000/thumbnail/${props}`)
                .then((res) => res.blob())
                .then((blob) => {
                    const url = URL.createObjectURL(blob);
                    setThumbnail(url);
                });
        }, [props]);

    return(
        <>
            <h3>Job: {props}</h3>
            {/* <img src={thumnbail} width={150} height={150}></img> */}
            <p>Status: {status}</p>
            <p><a href={`http://localhost:3000/results/${props}`}>CSV for {props}</a></p>

        </>
    )
}