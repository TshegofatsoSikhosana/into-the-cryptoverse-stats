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
    <footer className="blockquote-footer p-5 bg-dark mt-5">
            Made with ❤️
        <h6>
        <a href="https://twitter.com/cryptoverse13" className="p-2">
            <img src="/twitter.png" alt="twitter icon" width="50" height="50"/>
            @cryptoverse13
        </a>
        <a href="https://github.com/TshegofatsoSikhosana/into-the-cryptoverse-stats" className="p-2"> 
        <img src="/unnamed.png" alt="github icon" width="40" height="40"/> Tshegofatso </a> 
        </h6>
       
    </footer>
    </>)
}

export default MyApp
