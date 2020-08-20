import React from 'react';
import styles from './Tag.module.css'

export default function Rating({children}) {
    return (
      <div className={styles.tag}>
        {children}
      </div>
    )
}
