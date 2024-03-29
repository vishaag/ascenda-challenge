import React from 'react'
import styles from './HotelCard.module.css'
import utilStyles from '../styles/utilStyles.module.css'
import formatCurrency from '../utils/formatCurrency'
import ReactTooltip from 'react-tooltip';
import Stars from'./Stars'
import Rating from './Rating'
import Tag from './Tag.js'
import orderCompetitorsList from '../utils/orderCompetitorsList';

export default function HotelCard({photo, title, stars, rating, price, currency, list, toolTipData}) {
  let savings;
  let priceOfHighestCompetitor;

  const listArray = orderCompetitorsList(list, price)

  const airbrbIndex = listArray.findIndex(item => item[0] === 'Airbrb');
  if(airbrbIndex < listArray.length - 1) {
    priceOfHighestCompetitor = listArray[listArray.length - 1][1]
    savings = Math.round(((priceOfHighestCompetitor - price)/priceOfHighestCompetitor) * 100)
  }
  
  return (
    <div href="" className={styles.card}>
      <img src={photo}/>
      <div className={styles.details}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <Stars checked={stars} unchecked={5-stars}/>
        </div>

        <div className={styles.bottomRow}>
          <Rating rating={rating}/>

          { listArray.length > 0 &&
            <ul className={styles.list}>
              {listArray.map((item,index) => {
                return <li key={index}>
                  <h6>{item[0]}</h6>
                  <h6>{formatCurrency(item[1], currency)}</h6>
                </li>
              })}
            </ul>
          }
        
        <div className={styles.fade}></div>

        </div>
      </div>
      <div className={styles.price}>
      <div>
        {price ? 
          <>
            {savings ? <Tag>Save {savings}%</Tag> : ''}
            {toolTipData ? <h3 data-tip data-for={title}>{formatCurrency(price, currency)}*</h3> : <h3>{formatCurrency(price, currency)}</h3> }
            {savings ?  <h3 style={{textDecoration: 'line-through', color: '#888'}}>{formatCurrency(priceOfHighestCompetitor, currency)}</h3> : ''}

            {toolTipData ? <ReactTooltip id={title}>
              <h1>Breakdown</h1>
              <ul>
                <li>Price: {formatCurrency(Math.round(price - toolTipData.hotel_fees - toolTipData.tax), currency)}</li>
                <li>Hotel Fee: {formatCurrency(toolTipData.hotel_fees, currency)}</li>
                <li>Tax: {formatCurrency(toolTipData.tax, currency)}</li>
              </ul> 
            </ReactTooltip> : ''}
          </> : 
        <h4>Rates Unavailable</h4> }
      </div>
      <button className={utilStyles.button}>View Deal</button>
      </div>
    </div>
  )
}
