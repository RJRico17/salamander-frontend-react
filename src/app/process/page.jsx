"use client";

import { useState, useEffect, useRef } from 'react';  
import Header from "../Components/Header"
import Footer from "../Components/Footer"

export default function Process() {
    const [targetColor, setTargetColor] = useState("#ff0000");
    const [rangeValue, setRangeValue] = useState(50);

    const [data, setData] = useState([]);
    const [uuid, setUuid] = useState("");
    const [video, setVideo] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const origRef = useRef(null); // original photo
    const binRef = useRef(null); // binarized reference

    
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

    // Finds centroid of the largest connected group 
    const findLargest = (mask, w, h) => {
        const seen = Array.from({
            length: h
        }, () => Array(w).fill(false));
        const dirs = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1]
        ];
        let best = null;
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                if (mask[y][x] === 1 && !seen[y][x]) {
                    const stack = [
                        [y, x]
                    ];
                    seen[y][x] = true;
                    const pts = [];
                    while (stack.length) {
                        const [r, c] = stack.pop();
                        pts.push([r, c]);
                        for (const [dr, dc] of dirs) {
                            const nr = r + dr,
                                nc = c + dc;
                            if (nr >= 0 && nr < h && nc >= 0 && nc < w && !seen[nr][nc] && mask[nr][nc] === 1) {
                                seen[nr][nc] = true;
                                stack.push([nr, nc]);
                            }
                        }
                    }
                    if (!best || pts.length > best.pts.length) best = {
                        pts
                    };
                }
            }
        }
        if (!best) return null;
        const sum = best.pts.reduce((acc, [r, c]) => ({
            x: acc.x + c,
            y: acc.y + r
        }), {
            x: 0,
            y: 0
        });
        return {
            x: Math.floor(sum.x / best.pts.length),
            y: Math.floor(sum.y / best.pts.length)
        };
    };

    const hexToRgb = (hex) => {
    const v = parseInt(hex.replace("#", ""), 16);
        return {
            r: (v >> 16) & 255,
            g: (v >> 8) & 255,
            b: v & 255
        };
    };

    useEffect(() => {
    if (!video || !origRef.current || !binRef.current) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {

        const targetW = Math.min(img.width, 320);
        const targetH = Math.round((img.height / img.width) * targetW);

        const origCtx = origRef.current.getContext("2d");
        const binCtx = binRef.current.getContext("2d");

        origRef.current.width = binRef.current.width = targetW;
        origRef.current.height = binRef.current.height = targetH;

        origCtx.drawImage(img, 0, 0, targetW, targetH);

        const {
            r: tr,
            g: tg,
            b: tb
        } = hexToRgb(targetColor);
        const {
            data,
            width: w,
            height: h
        } = origCtx.getImageData(0, 0, targetW, targetH);
        const mask = Array.from({
            length: h
        }, () => Array(w).fill(0));
        for (let y = 0, idx = 0; y < h; y++) {
            for (let x = 0; x < w; x++, idx += 4) {
                const r = data[idx],
                    g = data[idx + 1],
                    b = data[idx + 2];
                const dist = Math.hypot(r - tr, g - tg, b - tb);
                mask[y][x] = dist < Number(rangeValue) ? 1 : 0;
            }
        }
        const centroid = findLargest(mask, w, h);

        // draw binarized
        const out = binCtx.createImageData(w, h);
        for (let y = 0, idx = 0; y < h; y++) {
            for (let x = 0; x < w; x++, idx += 4) {
                const val = mask[y][x] ? 255 : 0;
                out.data[idx] = out.data[idx + 1] = out.data[idx + 2] = val;
                out.data[idx + 3] = 255;
            }
        }
        binCtx.putImageData(out, 0, 0);

        // draw centroid dots
        if (centroid) {
            const drawDot = (ctx) => {
                ctx.fillStyle = "lime";
                ctx.beginPath();
                ctx.arc(centroid.x, centroid.y, 4, 0, Math.PI * 2);
                ctx.fill();
            };
            drawDot(origCtx);
            drawDot(binCtx);
        }
    };
    img.src = thumbnail || `http://localhost:3000/thumbnail/${video}`;
}, [video, targetColor, rangeValue, thumbnail]);


    function handleSubmit(e) {
        e.preventDefault();
        if (!video) { 
            alert ("Error: Choose a video");
            return;
        }
            console.log(video);
            console.log(targetColor);
            console.log(rangeValue);
            console.log(`http://localhost:3000/process/${video}?targetColor=${targetColor.replace(/^#/, "")}&threshold=${rangeValue}`);

            fetch(`http://localhost:3000/process/${video}?targetColor=${targetColor.replace(/^#/, "")}&threshold=${rangeValue}`, {method: "POST"})
                .then((res) => res.json())
                .then((data) => {
                    setUuid(data.jobId);
                    alert(`Process Started! Job UUID: ${data.jobId}`)
                })
                .catch((err) => {
                    console.error("Fetch failed:", err);
                    alert("Fetch failed");
                });
    }

    return(
        <>
            <Header />
            <h2>Process Videos</h2>
            <hr></hr>

            {video && (
            <div className="preview-block">
                <div className="preview-images">
                    <div>
                    <p>Original Frame (with centroid)</p>
                    <canvas ref={origRef} />
                </div>
                <div>
                    <p>Binarized Frame (with centroid)</p>
                    <canvas ref={binRef} />
                </div>
                </div>
            </div>
            )}

            <div className="form-section">
            <form className="main" onSubmit={handleSubmit}>
                {/* <img src={thumbnail} width={200} height={200} className='preview'></img> */}
                <div className='optionsbar'>
                    <div className='option'>
                        <p>Select a video</p>
                        <select id="videoselection" value={video || "none"} onChange={(e) => {
                                const name = e.target.value === "none" ? "" : e.target.value;
                                setVideo(name);
                                if (name) handlePreview(name);}}>
                            <option value="none">Select a video</option>
                            {data.map((el, idx) => (
                                <option key={idx} value={el}>{el}</option>
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
            </div>

            <Footer />
        </>
    )
}