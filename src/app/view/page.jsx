import Header from "../Components/Header"
import Footer from "../Components/Footer"

const list = ['test','test2','test3'];

export default function View() {
    return(
        <>
            <Header />
            <div className="main">
                <p>View</p>
                {/* call api on display, get the file paths to each video
                for loop, for each video from api return make a new video to display each video */}
                <img src={"https://cdn.britannica.com/22/248822-050-BC14C804/Fire-salamander.jpg"} width={100} height={100}></img>
                <p>salamander.mp4</p>
                <br></br>
                <img src={"https://cdn.britannica.com/22/248822-050-BC14C804/Fire-salamander.jpg"} width={100} height={100}></img>
                <p>fjdfjkdfuadsEH3U29.mp4</p>

                {list.forEach(el => {
                    <p>1{el}</p>
                })}

            </div>
            <Footer />
        </>
    )
}