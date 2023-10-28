import { Button, ButtonGroup, AppBar, Typography, Container, Toolbar, Box, Grid } from "@mui/material";
import { AppProviders } from "@app/components/app-providers";
import Link from "next/link"
export default function Nav() {
    return(
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box component="img" src="https://media.discordapp.net/attachments/893413559596380161/1167845849355788429/Megurine_Luka_-_25-ji_Nightcord_de._Chibi.webp?ex=654f9c34&is=653d2734&hm=7768b4f2c8927ebc1ed81799377f688981de93f044d1d54e9eb73f330d944ff0&=&width=50&height=50"></Box>
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
                    <ButtonGroup variant="text">
                    <Button><Link href="/" className="mx-2 text-pink-500">home</Link></Button>
                    <Button><Link href="/subapp" className="mx-2 text-pink-500">item list</Link></Button>
                    <Button onClick={AppProviders.setTheme}></Button>
                    </ButtonGroup>
                </Toolbar>
            </Container>
        </AppBar>
    );
}