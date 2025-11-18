import Header from "../Components/Header"
import Footer from "../Components/Footer"

export default function Completed() {
    return(
        <>
            <Header />
            <div className="main">
                {/* call to api for all jobs
                for loop thru all jobs
                if completed, give a link to view csv
                if not completed (in process) show in process */}
                <p>Completed</p>
                <p>Jobs</p>
                <img src={"https://cdn.britannica.com/22/248822-050-BC14C804/Fire-salamander.jpg"} width={100} height={100}></img>
                <p>Salamander.mp4</p>
                <p><a href="">CSV for Salamander.mp4</a></p>
                <br></br>
                <img src={"https://cdn.britannica.com/22/248822-050-BC14C804/Fire-salamander.jpg"} width={100} height={100}></img>
                <p>Salamander.mp4</p>
                <p><a href="">CSV for Salamander.mp4</a></p>
            </div>
            <Footer />
        </>
    )
}