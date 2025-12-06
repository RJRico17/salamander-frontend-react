import Header from "../Components/Header"
import Footer from "../Components/Footer"
import VideoProcessCard from "../Components/VideoProccessCard"

const list = ['test','test2','test3'];

export default function Completed() {
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
                {list.map((el, idx) => (
                    <VideoProcessCard props={el} key={idx} />
                ))}
            </div>
            <Footer />
        </>
    )
}