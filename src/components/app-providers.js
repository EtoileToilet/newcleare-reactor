"use client";
import { ThemeContext } from "@app/app/contexts/theme.context";
import { useState } from "react";
import { Provider } from "react-redux";
import { NextButton } from "./app-button";
import { store } from "@app/store/store";
import { AppFirebase } from "./app-firebase";


export const AppProviders = ( {children} ) => {
    const [theme, setTheme] = useState("dark");
    const toggleTheme = () => setTheme(theme === "dark"? "light" : "dark");
    return (
        <Provider store={store}>
            <AppFirebase>
        <ThemeContext.Provider value={theme}>
            <NextButton className='w-20' color="blue" onClick={toggleTheme}>toggle theme</NextButton>
            { children }
        </ThemeContext.Provider>
        </AppFirebase>
        </Provider>
    );
}