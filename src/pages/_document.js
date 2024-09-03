// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Standard Favicons */}
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='../public/favicon-16x16.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='../public/favicon-32x32.png'
        />

        {/* Apple Touch Icon */}
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='../public/apple-touch-icon.png'
        />

        {/* Android/Chrome Favicon */}
        <link
          rel='icon'
          type='image/png'
          sizes='192x192'
          href='../public/android-chrome-192x192.png'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
