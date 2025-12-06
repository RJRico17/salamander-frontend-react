'use client'

import { useState } from "react";
import { useEffect } from "react";

export default function VideoPreviewCard({props}) {

    console.log(props);

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
            {/* <img src={thumnbail} width={150} height={150}></img> */}
            <img src={thumbnail} width={150} height={150}></img>
            <p>{props}</p>
        </>
    )
}