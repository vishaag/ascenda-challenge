import styles from './Card.module.css'

export default function Card({photo, title, stars, rating, price}) {
  return (
    <a href="" className={styles.card}>
      <img src={photo}/>
      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        <h4 className={styles.stars}>Stars: {stars}/5</h4>
        <h4 className={styles.rating}>Rating: {rating}/10</h4>
        <ul class={styles.list}>
          <li>
            <h6>Trip.com</h6>
            <h6>$780</h6>
          </li>
          <li>
            <h6>Trip.com</h6>
            <h6>$780</h6>
          </li>
        </ul>
      </div>
      <div className={styles.price}>
        <h3>{price}</h3>
      </div>
    </a>
  )
}
