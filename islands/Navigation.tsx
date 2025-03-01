import { useEffect, useState } from "preact/hooks";

export default function Navigation() {
    const [currentPath, setCurrentPath] = useState("");

    useEffect(() => {
        setCurrentPath(globalThis.location.pathname);
    }, []);

    // Function to check if a link is active
    const isActive = (href: string) => {
        if (href === "/" && currentPath === "/") return true;
        if (href !== "/" && currentPath.startsWith(href)) return true;
        return false;
    };

    return (
        <nav class="md:col-span-1">
            <ul class="flex md:flex-col space-y-0 md:space-y-1 space-x-4 md:space-x-0">
                <li>
                    <a
                        href="/udstillinger"
                        class={`font-sans text-xl hover:underline ${isActive("/udstillinger") ? "font-bold" : ""}`}
                    >
                        Udstillinger
                    </a>
                </li>
                <li>
                    <a
                        href="/kulturprojekter"
                        class={`font-sans text-xl hover:underline ${isActive("/kulturprojekter") ? "font-bold" : ""}`}
                    >
                        Kulturprojekter
                    </a>
                </li>
                <li>
                    <a
                        href="/artikler"
                        class={`font-sans text-xl hover:underline ${isActive("/artikler") ? "font-bold" : ""}`}
                    >
                        Artikler
                    </a>
                </li>
                <li>
                    <a
                        href="/presse"
                        class={`font-sans text-xl hover:underline ${isActive("/presse") ? "font-bold" : ""}`}
                    >
                        Presse
                    </a>
                </li>
                <li>
                    <a
                        href="/om"
                        class={`font-sans text-xl hover:underline ${isActive("/om") ? "font-bold" : ""}`}
                    >
                        Om mig
                    </a>
                </li>
                <li>
                    <a
                        href="/kontakt"
                        class={`font-sans text-xl hover:underline ${isActive("/kontakt") ? "font-bold" : ""}`}
                    >
                        Kontakt
                    </a>
                </li>
            </ul>
        </nav>
    );
} 