import Header from "../Components/Header"
import Footer from "../Components/Footer"

export default function Upload() {
    return(
        <>
            <Header />
            <div className="main">
                <p>Upload Videos</p>
                    <form action="/upload_target_url" method="post" encType="multipart/form-data">
                        <label htmlFor="myfile">Select a file:</label>
                        <input type="file" id="myfile" name="myfile"></input>
                        <button>Submit</button>
                    </form>
            </div>
            <Footer />
        </>
    )
}