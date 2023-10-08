import { Button, ButtonGroup } from "@mui/material";
import Link from "next/link"
export default function Nav() {
    return(
        <div className="text-center">
            <ButtonGroup>
            <Button>
            <Link href="/" className="mx-2">
                Home
            </Link></Button>
            <Button><Link href="/subapp" className="mx-2">Test</Link></Button>
            </ButtonGroup>
        </div>
    );
}