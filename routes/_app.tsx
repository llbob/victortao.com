import { PageProps } from "$fresh/server.ts";


export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#EEE" />
        <link rel="stylesheet" href="/style.css" />
        <link rel="icon" href="/favicon.ico" />
        <title>Victor Tao</title>
        <style>
          {`
            @font-face {
              font-family: 'FA CPNWJSUOMXE';
              src: url('/fonts/FA_CPNWJSUOMXE/FA_CPNWJSUOMXE.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
              font-display: swap;
            }
              @font-face {
              font-family: 'Object Sans';
              src: url('/fonts/object_sans/ObjectSans-Regular.woff') format('woff');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
            
          `}
        </style>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
