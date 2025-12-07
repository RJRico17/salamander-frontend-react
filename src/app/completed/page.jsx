'use client'

import Header from "../Components/Header"
import Footer from "../Components/Footer"
import VideoProcessCard from "../Components/VideoProccessCard"
import { useEffect, useState } from "react";

export default function Completed() {
    const [data, setData] = useState([]);

    useEffect(() => {
    fetch('http://localhost:3000/api/results')
        .then((res) => res.json())
        .then((data) => {
            setData(data.results);
        });
    }, []);

    console.log(data);

    return(
        <>
            <Header />
            <div className="main">
                {/* call to api for all jobs
                for loop thru all jobs
                if completed, give a link to view csv
                if not completed (in process) show in process */}
                <h2>Completed Processes</h2>
                <hr></hr>
                {data.map((el, idx) => (
                    <VideoProcessCard props={el} key={idx} />
                ))}
            </div>
            <Footer />
        </>
    )
}