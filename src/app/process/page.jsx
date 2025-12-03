"use client";

import { useState } from 'react';  
import Header from "../Components/Header"
import Footer from "../Components/Footer"

export default function Process() {
    const [favColor, setFavColor] = useState("#ff0000");
    const [rangeValue, setRangeValue] = useState(50);

    return(
        <>
            <Header />
            <div className="main">
                <p>Process Videos</p>
                <select>
                    {/* for loop, call api, for each video returned in the api make an optinn */}
                    {/* when video selected display thumbnail with api */}
                    <option>Video</option>
                    <option>Video</option>
                    <option>Video</option>
                </select>
                <input type="color" id="favcolor" name="favcolor" value= {favColor} onChange={(e) => setFavColor(e.target.value)}></input>
                <input type="range" min="1" max="220" value= {rangeValue} onChange={(e) => setRangeValue(e.target.value)} className="slider" id="myRange"></input>
            </div>
            <Footer />
        </>
    )
}