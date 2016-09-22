import * as React from 'react'
import styles from './Serves.module.scss'

const Serves = ({ increase, decrease, recipeServes, servesModifier }) => {
  const effectiveServes = recipeServes + servesModifier
  const canDecreaseServes = effectiveServes > 1
  return (
    <div className={styles.servesContainer}>
      {canDecreaseServes && <div className={styles.changeServeSize} onClick={decrease}>-</div>}
      <div className={styles.serves}>{effectiveServes}</div>
      <div className={styles.changeServeSize} onClick={increase}>+</div>
    </div>
  )
}

export default Serves
