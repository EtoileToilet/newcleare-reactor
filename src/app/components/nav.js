import Link from "next/link"
export default function Nav() {
    return(
        <div>
            <Link href="/" className="mx-2">
                Home
            </Link>
            <span className="mx-4">|</span>
            <Link href="/subapp" className="mx-2">Test</Link>
        </div>
    );
}