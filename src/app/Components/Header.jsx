import Link from "next/link"

export default function Header() {
    return(
        <div className="header">
            <p>Salamnder Video Processor</p>
            <nav>
                <button><Link href="/">Home</Link></button>
                <button><Link href="/upload">Upload Video</Link></button>
                <button><Link href="/view">View Videos</Link></button>
                <button><Link href="/process">Process Video</Link></button>
                <button><Link href="/completed">Processed</Link></button>
            </nav>
        </div>
    )
}