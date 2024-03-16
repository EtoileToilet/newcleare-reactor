import { Button, ButtonGroup, AppBar, Typography, Container, Toolbar, Box, Grid } from "@mui/material";
import { AppProviders } from "@app/components/app-providers";
import Link from "next/link"
export default function Nav() {
    return(
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box component="img" src="https://static.miraheze.org/projectsekaiwiki/thumb/b/b9/25ji_Luka_chibi.png/64px-25ji_Luka_chibi.png"></Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        METALLIX
                    </Typography>
                    <ButtonGroup variant="text" className="flex item-center">
                    <Button className="py-4"><Link href="/" className="mx-2 text-pink-500">home</Link></Button>
                    <Button className="py-4"><Link href="/subapp" className="mx-2 text-pink-500">ứng dụng</Link></Button>
                    </ButtonGroup>
                </Toolbar>
            </Container>
        </AppBar>
    );
}