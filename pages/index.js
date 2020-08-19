import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Card from './components/Card'

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
    const pricesURL = `http://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo/1/${selectedCurrency}`;

    Promise.all([
      fetch(hotelsURL),
      fetch(pricesURL)
    ])
    .then(([hotels, prices]) => Promise.all([hotels.json(), prices.json()]))
    .then(([hotels, prices]) => {
      const objectsWithoutPrice = [];
      let mergedResult = []
      hotels.map((hotel)=>{
        const pricesObj = prices.find(price => price.id === hotel.id);
        if(!pricesObj) {
          objectsWithoutPrice.push(hotel)
        } else {
          mergedResult.push({ ...hotel, ...pricesObj })
        }
      })
      mergedResult = mergedResult.concat(objectsWithoutPrice)
      setHotels(mergedResult)
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

      <main className={styles.main}>
        <h1 className={styles.title}>
          Airbrb
        </h1>

        <h3 className={styles.description}>Currency</h3>
        <ul className={styles.list}>
          <li><a onClick={() => changeCurrency('USD')} className={`${currency === 'USD' ? styles.bold : ""}`}>USD</a></li>
          <li><a onClick={() => changeCurrency('SGD')} className={`${currency === 'SGD' ? styles.bold : ""}`}>SGD</a></li>
          <li><a onClick={() => changeCurrency('CNY')} className={`${currency === 'CNY' ? styles.bold : ""}`}>CNY</a></li>
          <li><a onClick={() => changeCurrency('KRW')} className={`${currency === 'KRW' ? styles.bold : ""}`}>KRW</a></li>
        </ul>

        <div className={styles.grid}>
          {
            hotels.map((hotel,index) => {
              return (
                <Card key={index} photo={hotel.photo} title={hotel.name} rating={hotel.rating} stars={hotel.stars} price={hotel.price} currency={currency} list={hotel.competitors}/>
              )
            })
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
