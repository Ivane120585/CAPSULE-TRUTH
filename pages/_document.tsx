import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0A84FF" />
      </Head>
      <body className="bg-background text-foreground font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
