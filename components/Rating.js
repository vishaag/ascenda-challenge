import React from 'react';
import styles from './Rating.module.css'

export default function Rating({rating}) {
  if(rating > 7) {
    return (
      <div className={`${styles.rating} ${styles.excellent}`}>
      {rating}
      </div>
    )
  } else if (rating > 4) {
    return (
      <div className={`${styles.rating} ${styles.good}`}>
      {rating}
      </div>
    )
  } else {
    return (
      <div className={`${styles.rating} ${styles.bad}`}>
      {rating}
      </div>
    )
  }
}
