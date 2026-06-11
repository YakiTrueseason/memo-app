//ダークモード

import { createContext,useEffect,useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({children}){
    const [darkMode,setDarkMode] = useState(()=>{
        const saved = localStorage.getItem("darkMode");
        return saved ? JSON.parse(saved) : false;
    });
    useEffect(()=>{
        localStorage.setItem(
            "darkMode",JSON.stringify(darkMode)
        );
    },[darkMode]);
    return(
        <ThemeContext.Provider
            value={{
                darkMode,setDarkMode
            }}
            >
                {children}
            </ThemeContext.Provider>
    );
}