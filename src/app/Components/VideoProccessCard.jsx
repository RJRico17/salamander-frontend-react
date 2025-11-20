'use client'

import { useState } from "react";

export default function VideoProcessCard({props}) {

    // const [thumbnail, setThumbnail] = useState(null);
    const [status, setStatus] = useState("processing")
    
    // useEffect(() => {
    //     // use props to use api link to return thumbail for each video
    //     fetch(`mocklink.com/${props}`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setData(data);
    //         });
    // }, []);

    return(
        <>
            <p>{props}</p>
            {/* <img src={thumnbail} width={150} height={150}></img> */}
            <p>Status: {status}</p>
            <img src={"https://cdn.britannica.com/22/248822-050-BC14C804/Fire-salamander.jpg"} width={150} height={150}></img>
            <p><a href="">CSV for {props}</a></p>

        </>
    )
}