import { useEffect, useState } from "preact/hooks";
import SocialIcons from "../islands/SocialIcons.tsx";

export default function Navigation() {
    const [currentPath, setCurrentPath] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setCurrentPath(globalThis.location.pathname);

        // Close menu when window is resized to desktop size
        const handleResize = () => {
            if (globalThis.innerWidth >= 768 && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        globalThis.addEventListener('resize', handleResize);

        return () => {
            globalThis.removeEventListener('resize', handleResize);
        };
    }, [isMenuOpen]);

    // Function to check if a link is active
    const isActive = (href: string) => {
        if (href === "/" && currentPath === "/") return true;
        if (href !== "/" && currentPath.startsWith(href)) return true;
        return false;
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {/* Desktop navigation */}
            <nav class="hidden md:block md:col-span-1">
                <ul class="flex md:flex-col space-y-0 md:space-y-1 space-x-4 md:space-x-0">
                    <li>
                        <a
                            href="/udstillinger"
                            class={`font-serif menu-link ${isActive("/udstillinger") ? "text-activeColor underline" : ""}`}
                        >
                            Udstillinger
                        </a>
                    </li>
                    <li>
                        <a
                            href="/kulturprojekter"
                            class={`font-serif menu-link ${isActive("/kulturprojekter") ? "text-activeColor underline" : ""}`}
                        >
                            Kulturprojekter
                        </a>
                    </li>
                    <li>
                        <a
                            href="/artikler"
                            class={`font-serif menu-link ${isActive("/artikler") ? "text-activeColor underline" : ""}`}
                        >
                            Artikler
                        </a>
                    </li>
                    <li>
                        <a
                            href="/presse"
                            class={`font-serif menu-link ${isActive("/presse") ? "text-activeColor underline" : ""}`}
                        >
                            Presse
                        </a>
                    </li>
                    <li>
                        <a
                            href="/om"
                            class={`font-serif menu-link ${isActive("/om") ? "text-activeColor underline" : ""}`}
                        >
                            Om mig
                        </a>
                    </li>
                    <li>
                        <a
                            href="/kontakt"
                            class={`font-serif menu-link ${isActive("/kontakt") ? "text-activeColor underline" : ""}`}
                        >
                            Kontakt
                        </a>
                    </li>
                </ul>
            </nav>

            {/* Mobile hamburger button - moved from fixed to relative positioning */}
            <button
                onClick={toggleMenu}
                class="md:hidden relative z-30 p-2 ml-4 bg-backgroundColor rounded-md"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    {isMenuOpen ? (
                        <>
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </>
                    ) : (
                        <>
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </>
                    )}
                </svg>

            </button>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div class="fixed inset-0 bg-backgroundColor z-20 md:hidden pt-16 px-6">
                    <ul class="flex flex-col space-y-4 justify-center items-center h-full">
                        <li>
                            <a
                                href="/udstillinger"
                                class={`font-serif text-xl menu-link ${isActive("/udstillinger") ? "text-activeColor underline" : ""}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Udstillinger
                            </a>
                        </li>
                        <li>
                            <a
                                href="/kulturprojekter"
                                class={`font-serif text-xl menu-link ${isActive("/kulturprojekter") ? "text-activeColor underline" : ""}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Kulturprojekter
                            </a>
                        </li>
                        <li>
                            <a
                                href="/artikler"
                                class={`font-serif text-xl menu-link ${isActive("/artikler") ? "text-activeColor underline" : ""}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Artikler
                            </a>
                        </li>
                        <li>
                            <a
                                href="/presse"
                                class={`font-serif text-xl menu-link ${isActive("/presse") ? "text-activeColor underline" : ""}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Presse
                            </a>
                        </li>
                        <li>
                            <a
                                href="/om"
                                class={`font-serif text-xl menu-link ${isActive("/om") ? "text-activeColor underline" : ""}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Om mig
                            </a>
                        </li>
                        <li>
                            <a
                                href="/kontakt"
                                class={`font-serif text-xl menu-link ${isActive("/kontakt") ? "text-activeColor underline" : ""}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Kontakt
                            </a>
                        </li>
                        <div class="flex justify-between items-center pt-20">
                            <SocialIcons />
                        </div>
                    </ul>
                </div>
            )}
        </>
    );
} 