import styles from './Card.module.css'
import formatCurrency from '../utils/formatCurrency'

export default function Card({photo, title, stars, rating, price, currency, list}) {
  price = price ? formatCurrency(price, currency) : null

  //Convert list object into an array
  const listArray = list ? Object.entries(list) : []

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
      {price ? <h3>{price}</h3> : <h3>Rates Unavailable</h3> }
      </div>
    </a>
  )
}
