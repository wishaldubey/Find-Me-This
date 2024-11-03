// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.png" sizes="any" />
        
        {/* iOS Icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Android Icons */}
        <link rel="icon" type="image/png" sizes="192x192" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
        
        {/* Manifest for PWA */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
