"use client";

import { useState, useEffect } from 'react';  
import Header from "../Components/Header"
import Footer from "../Components/Footer"

export default function Process() {
    const [targetColor, setTargetColor] = useState("#ff0000");
    const [rangeValue, setRangeValue] = useState(50);

    const [data, setData] = useState([]);
    const [uuid, setUuid] = useState("");
    const [video, setVideo] = useState(null);
    
    useEffect(() => {
        fetch('http://localhost:3000/api/videos')
            .then((res) => res.json())
            .then((data) => {
            setData(data.videos);
        });
    }, []);

    function handleSubmit() {
        if (video===null) alert("Error: Choose a video")
        else {
            fetch(`http://localhost:3000/process/${video}?targetColor=${targetColor}&threshold=${rangeValue}`, {method: "POST"})
                .then((res) => res.json())
                .then((data) => {
                setUuid(data.jobId);
            });
            alert(`Process Started! Job UUID: ${uuid}`)
        }
    }

    return(
        <>
            <Header />
            <form className="main" action={handleSubmit}>
                <p>Process Videos</p>
                <select>
                    <option value="none">Select a video</option>
                    {data.map((el, idx) => (
                        <option key={idx} value={el} onClick={setVideo(el)}>{el}</option>
                    ))}
                </select>
                <p>Target Hex</p>
                <input type="color" id="targetcolor" name="targetColor" value= {targetColor} onChange={(e) => setTargetColor(e.target.value)}></input>
                <p>Threshold</p>
                <input type="range" min="1" max="220" value= {rangeValue} onChange={(e) => setRangeValue(e.target.value)} className="slider" id="myRange"></input>
                <br></br>
                <button type='submit'>Process</button>
            </form>
            <Footer />
        </>
    )
}