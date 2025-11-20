import Header from "../Components/Header"
import Footer from "../Components/Footer"
import VideoPreviewCard from "../Components/VideoPreviewCard";

const list = ['test','test2','test3'];

export default function View() {
    return(
        <>
            <Header />
            <div className="main">
                <p>View</p>
                {/* call api on display, get the file paths to each video
                for loop, for each video from api return make a new video to display each video */}
                {list.map((el, idx) => (
                    <VideoPreviewCard props={el} key={idx} />
                ))}

                

            </div>
            <Footer />
        </>
    )
}