import Header from "../Components/Header"
import Footer from "../Components/Footer"

export default function Process() {
    return(
        <>
            <Header />
            <div className="main">
                <p>Process</p>
                <select>
                    {/* for loop, call api, for each video returned in the api make an optinn */}
                    {/* when video selected display thumbnail with api */}
                    <option>Video</option>
                    <option>Video</option>
                    <option>Video</option>
                </select>
                <input type="color" id="favcolor" name="favcolor" value="#ff0000"></input>
                <input type="range" min="1" max="220" value="50" class="slider" id="myRange"></input>
            </div>
            <Footer />
        </>
    )
}