"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {

    const root = document.documentElement; //html

    if (theme === "dark") {
        root.classList.add("dark");
    } else {
        root.classList.remove("dark");
    }

}
export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        const saved = (localStorage.getItem("theme") as Theme | null) ?? "light";
        setTheme(saved);
        applyTheme(saved);
    }, []);

    return (
        <button
            type="button"
            className="themeToggle"
            data-theme={theme}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            onClick={() => {
                const newTheme = theme === "light" ? "dark" : "light";
                setTheme(newTheme);
                applyTheme(newTheme);
                localStorage.setItem("theme", newTheme);
            }}
        >
            <span className="themeToggleIconWrap" aria-hidden="true">
                <span className="themeToggleIcon iconMoon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="themeToggleSvg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                        />
                    </svg>
                </span>

                <span className="themeToggleIcon iconSun">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="themeToggleSvg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        />
                    </svg>
                </span>
            </span>

            <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
        </button>
    );
}