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
    const [thumbnail, setThumbnail] = useState(null);
    
    useEffect(() => {
        fetch('http://localhost:3000/api/videos')
            .then((res) => res.json())
            .then((data) => {
            setData(data.videos);
        });
    }, []);

    function handlePreview(x) {
        setVideo(x);
        fetch(`http://localhost:3000/thumbnail/${x}`)
            .then((res) => res.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                setThumbnail(url);
        });
    }

    function handleSubmit() {
        const val = document.getElementById('videoselection').value;
        if (val==="none") alert("Error: Choose a video")
        else {
            console.log(video);
            console.log(targetColor);
            console.log(rangeValue);
            fetch(`http://localhost:3000/process/${video}?targetColor=${targetColor}&threshold=${rangeValue}`, {method: "POST"})
                .then((res) => res.json())
                .then((data) => {
                    setUuid(data.jobId);
                    alert(`Process Started! Job UUID: ${data.jobId}`)
                })
                .catch((err) => {
                    console.error("Fetch failed:", err);
                    alert("Fetch failed");
                });;
        }
    }

    return(
        <>
            <Header />
            <h2>Process Videos</h2>
            <hr></hr>
            <form className="main" onSubmit={handleSubmit}>
                <img src={thumbnail} width={200} height={200} className='preview'></img>
                <div className='optionsbar'>
                    <div className='option'>
                        <p>Select a video</p>
                        <select id='videoselection'>
                            <option value="none">Select a video</option>
                            {data.map((el, idx) => (
                                <option key={idx} value={el} onClick={handlePreview(el)}>{el}</option>
                            ))}
                        </select>
                    </div>
                    <div className='option'>
                        <p>Target Color</p><input type="color" id="targetcolor" name="targetColor" value= {targetColor} onChange={(e) => setTargetColor(e.target.value)}></input>
                    </div>
                    <div className='option'>
                        <p>Threshold: {rangeValue}</p><input type="range" min="1" max="220" value= {rangeValue} onChange={(e) => setRangeValue(e.target.value)} className="slider" id="myRange"></input>    
                    </div>
                </div>
                <hr></hr>
                <br></br>
                <button type='submit'>Process</button>
            </form>
            <Footer />
        </>
    )
}