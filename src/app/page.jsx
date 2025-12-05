import Header from "./Components/Header";
import Footer from "./Components/Footer";
export default function Home() {
  return (
    <>
      <Header />
        <div className="main">
          <h2>Welcome to the Salamander Video Processing App.</h2>
          <p>A salamander tracking app that returns CSV data of the centre of a salamander over a video based off target color and threshold.</p>
          <hr></hr>
          <h3>Upload Videos</h3>
          <p>Move .mp4 video of salamander into your videos folder of the app directory</p>
          <h3>Customize Job Specifications</h3>
          <p>Select the target hex color as well as the threshold of color distance to track the salamander</p>
          <p>Click Submit</p>
          <h3>View Finished Jobs</h3>
          <p>View proccessed and processing jobs under &quot;Processed&quot;</p>
        </div>
      <Footer />
    </>
  );
}
