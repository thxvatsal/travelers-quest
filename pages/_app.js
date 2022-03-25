import '../styles/globals.css'
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Traveler&apos;s Quest</title>
        <link rel='shortcut icon' href='/kite.ico' />
      </Head>
      <Component {...pageProps} />
    </>
)
}

export default MyApp
