import { JSX } from "preact";
import { StripeScript } from "./StripeScript.tsx";
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
          <a href="/" class="block mb-2 md:mb-4 lg:mb-8">
            <span class="text-xl font-sans hover:underline">Victor Tao</span>
          </a>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Navigation />
            <main class="md:col-span-3">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
