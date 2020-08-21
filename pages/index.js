import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import HotelCard from '../components/HotelCard'
import mergeHotelsAndPrices from '../utils/mergeHotelsAndPrices'

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [currency, setCurrency] = useState();
  const [displayCurrency, setdisplayCurrency] = useState();

  useEffect(() => {
    const defaultCurrency = 'USD'
    const locallySetCurrency = localStorage.getItem('selectedCurrency')
    let selectedCurrency;

    // if currency exists in localstorage, set that in the currency state, else set defaultCurrency ('USD')
    if(locallySetCurrency) {
      selectedCurrency = locallySetCurrency
      setCurrency(locallySetCurrency);
    } else {
      selectedCurrency = defaultCurrency
      setCurrency(defaultCurrency);
      localStorage.setItem('selectedCurrency', defaultCurrency);
    }

    // URLs - Make changes here to test different APIs
    const hotelsURL = 'https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo';
    const pricesURL = `https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo/1/${selectedCurrency}`;

    // Wait for both fetch to complete
    Promise.all([
      fetch(hotelsURL),
      fetch(pricesURL)
    ])
    .then(([hotels, prices]) => Promise.all([hotels.json(), prices.json()]))
    .then(([hotels, prices]) => {
      const mergedResult = mergeHotelsAndPrices(hotels, prices)
      setHotels(mergedResult)
      setdisplayCurrency(currency)
      console.log(mergedResult)
    })
  },[currency])

  const changeCurrency = (selectedCurrency) => {
    if(selectedCurrency !== currency) {
      localStorage.setItem('selectedCurrency', selectedCurrency);
      setCurrency(selectedCurrency)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Airbrb - You get what you see</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav>
        <header>
          <h1 className={styles.title}>
            <span>A</span>
            <span>I</span>
            <span>R</span>
            <span>B</span>
            <span>R</span>
            <span>B</span>
          </h1>
        </header>
        <ul className={styles.list}>
          <li><a onClick={() => changeCurrency('USD')} className={`${currency === 'USD' ? styles.activeText : ""}`}>USD</a></li>
          <li><a onClick={() => changeCurrency('SGD')} className={`${currency === 'SGD' ? styles.activeText : ""}`}>SGD</a></li>
          <li><a onClick={() => changeCurrency('CNY')} className={`${currency === 'CNY' ? styles.activeText : ""}`}>CNY</a></li>
          <li><a onClick={() => changeCurrency('KRW')} className={`${currency === 'KRW' ? styles.activeText : ""}`}>KRW</a></li>
        </ul>
      </nav>

      <main className={styles.main}>
        <div className={styles.grid}>
          {
            hotels.length ? 
            hotels.map((hotel,index) => {
              return (
                <HotelCard key={index} photo={hotel.photo} title={hotel.name} rating={hotel.rating} stars={hotel.stars} price={hotel.price} currency={displayCurrency} list={hotel.competitors} toolTipData={hotel.taxes_and_fees}/>
              )
            }) : 
            <img src="/loading.svg"></img>
          }
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vishaag.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Submitted by Vishaag
        </a>
      </footer>
    </div>
  )
}
