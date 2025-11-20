export default function VideoProcessCard({props}) {

    const [thumnbail, setThumbnail] = useState(null);
    
    useEffect(() => {
        // use props to use api link to return thumbail for each video
        fetch(`mocklink.com/${props}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
    }, []);

    return(
        <>
            <p>{props}</p>
            {/* <img src={thumnbail} width={150} height={150}></img> */}
            <img src={"https://cdn.britannica.com/22/248822-050-BC14C804/Fire-salamander.jpg"} width={150} height={150}></img>
            <p><a href="">CSV for {props}</a></p>
        </>
    )
}