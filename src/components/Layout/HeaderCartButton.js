import React, { useContext, useEffect, useState } from 'react'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'
import styles from './HeaderCartButton.module.css'
const HeaderCartButton = (props) => {
  const [btnIsHighlight, setBtnIsHighlight] = useState(false)
  const cartCtx = useContext(CartContext)
  const { items } = cartCtx
  const numberOfCartItems = items.reduce((prevNumber, item) => {
    return prevNumber + item.amount
  }, 0)
  const btnStyles = `${styles.button} ${btnIsHighlight ? styles.bump : ''}`
  useEffect(() => {
    if (items.length === 0) {
      return
    }
    setBtnIsHighlight(true)
    const timer = setTimeout(() => {
      setBtnIsHighlight(false)
    }, 300)

    //clean up function
    return () => {
      clearTimeout(timer)
    }
  }, [items])
  return (
    <button className={btnStyles} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span className={styles.title}>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
