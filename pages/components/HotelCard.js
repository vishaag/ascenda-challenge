import styles from './HotelCard.module.css'
import formatCurrency from '../utils/formatCurrency'

export default function HotelCard({photo, title, stars, rating, price, currency, list}) {
  let savings;
  let priceOfHighestCompetitor;
  /* 
    list looks like this : 
    {Prestigia: 122.49, Kayak: 139.5}
  */

  const listArray = list ? Object.entries(list) : []   //Convert list object into an array
  /* 
    listArray looks like this : 
    [
      ["Prestigia", 122.49]
      ["Kayak", 139.5]
    ]
  */

  if(listArray.length > 1) {
    listArray.push(['Airbrb', price]) //Add Airbrb to the competitor pricing list
  }

  listArray.sort((a,b) => {
    return a[1] - b[1]
  })

  const airbrbIndex = listArray.findIndex(item => item[0] === 'Airbrb');
  if(airbrbIndex < listArray.length - 1) {
    priceOfHighestCompetitor = listArray[listArray.length - 1][1]
    savings = Math.round(((priceOfHighestCompetitor - price)/priceOfHighestCompetitor) * 100)
    console.log(price, priceOfHighestCompetitor, savings)
  }

  price = price ? formatCurrency(price, currency) : null

  return (
    <a href="" className={styles.card}>
      <img src={photo}/>
      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        <h4 className={styles.stars}>Stars: {stars}/5</h4>
        <h4 className={styles.rating}>Rating: {rating}/10</h4>
        <ul className={styles.list}>
        {
          listArray.map((item,index) => {
            return <li key={index}>
              <h6>{item[0]}</h6>
              <h6>{formatCurrency(item[1], currency)}</h6>
            </li>
          })
        }
        </ul>
      </div>
      <div className={styles.price}>
      {price ? 
        <>
          {savings ?  <h3 style={{textDecoration: 'line-through'}}>{formatCurrency(priceOfHighestCompetitor, currency)}</h3> : ''}
          <h3>{price}</h3> 
          {savings ? <h3>Save {savings}%</h3> : ''}
        </> : 
        <h3>Rates Unavailable</h3> }
      </div>
    </a>
  )
}
