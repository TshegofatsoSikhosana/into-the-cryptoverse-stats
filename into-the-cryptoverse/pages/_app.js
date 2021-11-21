import '../styles/globals.css'
import Head from "next/head";
import NavBar from '../components/common/navbar/NavBar';


function MyApp({ Component, pageProps }) {
return (
    <>
    <Head>
    <title>Into The CryptoVerse Fan Page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
    crossOrigin="anonymous" 
    />
    {/* <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
    crossOrigin="anonymous"></script> */}
    </Head>
    <NavBar/>
        <Component {...pageProps} />
    </>)
}

export default MyApp
