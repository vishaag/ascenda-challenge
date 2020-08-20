import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import HotelCard from '../components/HotelCard'
import mergeHotelsAndPrices from '../utils/mergeHotelsAndPrices'

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [currency, setCurrency] = useState();

  useEffect(() => {
    const defaultCurrency = 'USD'
    const locallySetCurrency = localStorage.getItem('selectedCurrency')
    let selectedCurrency;

    if(locallySetCurrency) {
      selectedCurrency = locallySetCurrency
      setCurrency(locallySetCurrency);
    } else {
      selectedCurrency = defaultCurrency
      setCurrency(defaultCurrency);
      localStorage.setItem('selectedCurrency', defaultCurrency);
    }
    
    const hotelsURL = 'https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo';
    const pricesURL = `https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo/1/${selectedCurrency}`;

    Promise.all([
      fetch(hotelsURL),
      fetch(pricesURL)
    ])
    .then(([hotels, prices]) => Promise.all([hotels.json(), prices.json()]))
    .then(([hotels, prices]) => {
      const mergedResult = mergeHotelsAndPrices(hotels, prices)
      setHotels(mergedResult)
      // const hotel = [{
      //   "id":1,
      //   "name":"Shinagawa Prince Hotel",
      //   "rating":7.7,
      //   "stars":4,
      //   "address":"108-8611 Tokyo Prefecture, Minato-ku, Takanawa 4-10-30, Japan",
      //   "photo":"https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg",
      //   "competitors":{"Booking.com":125,"Hotels.com":121,"Expedia":120,"getaroom":140,"AMOMA.com":132.77},
      //   "price": 125
      // }
      // ]
      // setHotels(hotel)
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
            Airbrb
          </h1>
        </header>
        <ul className={styles.list}>
          <li><a onClick={() => changeCurrency('USD')} className={`${currency === 'USD' ? styles.bold : ""}`}>USD</a></li>
          <li><a onClick={() => changeCurrency('SGD')} className={`${currency === 'SGD' ? styles.bold : ""}`}>SGD</a></li>
          <li><a onClick={() => changeCurrency('CNY')} className={`${currency === 'CNY' ? styles.bold : ""}`}>CNY</a></li>
          <li><a onClick={() => changeCurrency('KRW')} className={`${currency === 'KRW' ? styles.bold : ""}`}>KRW</a></li>
        </ul>
      </nav>

      <main className={styles.main}>
        <div className={styles.grid}>
          {
            hotels.length ? 
            hotels.map((hotel,index) => {
              return (
                <HotelCard key={index} photo={hotel.photo} title={hotel.name} rating={hotel.rating} stars={hotel.stars} price={hotel.price} currency={currency} list={hotel.competitors} toolTipData={hotel.taxes_and_fees}/>
              )
            }) : 
            <img src="/loading.gif"></img>
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
