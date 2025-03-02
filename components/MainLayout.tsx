import { JSX } from "preact";
import { StripeScript } from "./StripeScript.tsx";
import SocialIcons from "../islands/SocialIcons.tsx";
import Navigation from "../islands/Navigation.tsx";

// Define the layout component that accepts children
export function MainLayout({ children }: { children: JSX.Element }) {
  return (
    <html>
      <head>
        <StripeScript />
      </head>
      <body class="font-sans leading-relaxed bg-backgroundColor">
        <div class="max-w-none mx-4 my-4">
          <div class="flex justify-between items-center mb-2 md:mb-4 lg:mb-8">
            <a href="/" class="block">
              <div class="text-lg font-sans hover:underline relative overflow-hidden hover:text-pink">
                <span class="inline-block animate-bounce-around">Victor</span>
                <span class="mx-1"></span>
                <span class="inline-block relative">
                  <span class="absolute top-0 left-0 animate-name-change">Tao</span>
                  <span class="absolute top-0 left-0 animate-name-change-delay text-pink font-fa">τa 🫧    o</span>
                  <span class="absolute top-0 left-0 animate-name-change-delay-2 text-black">  τ a  🌻🫧o</span>
                  <span class="absolute top-0 left-0 animate-name-change-delay-3 text-black font-fa"> τ a0</span>
                  <span class="absolute top-0 left-0 animate-name-change-delay-4 text-pink">τ   a⁕⁕o</span>
                  <span class="absolute top-0 left-0 animate-name-change-delay-5 text-black">T a  0</span>
                  <span class="absolute top-0 left-0 animate-name-change-delay-6 text-black">Ta    O</span>
                  <span class="absolute top-0 left-0 animate-name-change-delay-7 text-black">Tao</span>
                  <span class="invisible">TTTTTTao</span> {/* Spacer to maintain layout - use the longest version */}
                </span>
              </div>
            </a>
            <div class="flex items-center">
              <div class="hidden md:block flex-shrink-0">
                <SocialIcons />
              </div>
              <div class="md:hidden">
                <Navigation />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div class="hidden md:block">
              <Navigation />
            </div>
            <main class="md:col-span-4">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
