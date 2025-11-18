import Header from "../Components/Header"
import Footer from "../Components/Footer"

export default function Upload() {
    return(
        <>
            <Header />
            <div className="main">
                <p>Upload</p>
                    <form action="/upload_target_url" method="post" enctype="multipart/form-data">
                    <label for="myfile">Select a file:</label>
                    <input type="file" id="myfile" name="myfile"></input>
                </form>
            </div>
            <Footer />
        </>
    )
}