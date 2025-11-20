export default function VideoProcessCard({props}) {
    return(
        <>
            <p>{props}</p>
            <img src={"https://cdn.britannica.com/22/248822-050-BC14C804/Fire-salamander.jpg"} width={150} height={150}></img>
            <p><a href="">CSV for {props}</a></p>
        </>
    )
}