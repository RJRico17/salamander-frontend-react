import Link from "next/link"

export default function Header() {
    return(
        <div className="header">
            <h1>Salamnder Video Processor</h1>
            <nav>
                <button><Link href="/">Home</Link></button>
                <button><Link href="/view">View Videos</Link></button>
                <button><Link href="/process">Process Video</Link></button>
                <button><Link href="/completed">Processed</Link></button>
            </nav>
        </div>
    )
}