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
              <span class="text-xl font-sans hover:underline">Victor Tao</span>
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
