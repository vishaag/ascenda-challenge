import styles from './HotelCard.module.css'
import formatCurrency from '../utils/formatCurrency'
import ReactTooltip from 'react-tooltip';

export default function HotelCard({photo, title, stars, rating, price, currency, list, toolTipData}) {
  let savings;
  let priceOfHighestCompetitor;
  let toolTipText;
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

  // price = price ? formatCurrency(price, currency) : null

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
          {toolTipData ? <h3 data-tip data-for={title}>{formatCurrency(price, currency)}*</h3> : <h3>{formatCurrency(price, currency)}</h3> }
          {savings ? <h3>Save {savings}%</h3> : ''}
          {toolTipData ? <ReactTooltip id={title}>
            <h1>Breakdown</h1>
            <ul>
              <li>Price: {formatCurrency(Math.round(price - toolTipData.hotel_fees - toolTipData.tax), currency)}</li>
              <li>Hotel Fee: {formatCurrency(toolTipData.hotel_fees, currency)}</li>
              <li>Tax: {formatCurrency(toolTipData.tax, currency)}</li>
            </ul> 
          </ReactTooltip> : ''}
        </> : 
        <h3>Rates Unavailable</h3> }

      </div>

    </a>
  )
}
