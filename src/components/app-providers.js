"use client";
import { ThemeContext } from "@app/app/contexts/theme.context";
import { Suspense, useState } from "react";
import { Provider } from "react-redux";
import { NextButton } from "./app-button";
import { store } from "@app/store/store";
import { AppFirebase } from "./app-firebase";
import { CssBaseline, StyledEngineProvider, ThemeProvider, createTheme } from "@mui/material";
import { pink } from "@mui/material/colors";
import loadingScreen from "@app/app/loading";

const theme = createTheme({
    palette: {
        primary: pink,
        mode: "dark",
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: "outlined",
                className: 'border border-solid py-2 px-4 mr-2',
                style: {
                    textTransform: "uppercase",
                }
            }
        }
    }
});

export const AppProviders = ( {children} ) => {
    //const [theme, setTheme] = useState("dark");
    //const toggleTheme = () => setTheme(theme === "dark"? "light" : "dark");

    return (
        <Provider store={store}>
            <AppFirebase>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Suspense fallback={<loadingScreen/>}/>          
                        { children }
                    </ThemeProvider>
                </StyledEngineProvider>
            </AppFirebase>
        </Provider>
    );
}