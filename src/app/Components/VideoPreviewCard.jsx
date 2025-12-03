'use client'

import { useState } from "react";
import { useEffect } from "react";

export default function VideoPreviewCard({props}) {

    console.log(props);

    const [thumnbail, setThumbnail] = useState(null);

    useEffect(() => {
        // use props to use api link to return thumbail for each video
        fetch(`http://localhost:3000/thumbnail/${props}`)
            .then((res) => res.json())
            .then((data) => {
                setThumbnail(data);
            });
    }, []);

    return(
        <>
            {/* <img src={thumnbail} width={150} height={150}></img> */}
            <img src={thumnbail} width={150} height={150}></img>
            <p>{props}</p>
        </>
    )
}