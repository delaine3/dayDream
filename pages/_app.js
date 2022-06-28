import '../css/style.css'
import '../css/form.css'
import Head from 'next/head'
import Navbar from "../components/navbar";

function MyApp({ Component, pageProps }) {
  return (
    <div className='app'>
      <Head>
        <title>Story Book App</title>
      </Head>
      <Navbar  />

      <div className="grid wrapper ">
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
