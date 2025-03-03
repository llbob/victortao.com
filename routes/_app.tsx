import { PageProps } from "$fresh/server.ts";


export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/style.css" />
        <link rel="icon" href="/favicon.ico" />
        <title>Victor Tao</title>
        <style>
          {`
            @font-face {
              font-family: 'Object Sans';
              src: url('/fonts/ObjectSans/ObjectSans-Regular.woff2') format('woff2');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'Object Sans';
              src: url('/fonts/ObjectSans/ObjectSans-Medium.woff2') format('woff2');
              font-weight: 500;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'Object Sans';
              src: url('/fonts/ObjectSans/ObjectSans-Bold.woff2') format('woff2');
              font-weight: 700;
              font-style: normal;
              font-display: swap;
            }
              @font-face {
              font-family: 'GFS Artemisia';
              src: url('/fonts/GFS_Artemisia/GFSArtemisia-Regular.woff2') format('woff2');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'GFS Artemisia';
              src: url('/fonts/GFS_Artemisia/GFSArtemisia-Italic.woff2') format('woff2');
              font-weight: 400;
              font-style: italic;
              font-display: swap;
            }
            @font-face {
              font-family: 'GFS Artemisia';
              src: url('/fonts/GFS_Artemisia/GFSArtemisia-Bold.woff2') format('woff2');
              font-weight: 600;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'FA CPNWJSUOMXE';
              src: url('/fonts/FA_CPNWJSUOMXE/FA_CPNWJSUOMXE.ttf') format('truetype');
              font-weight: normal;
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
