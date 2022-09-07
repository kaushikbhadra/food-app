import React, { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = {
  items: [],
  totalAmount: 0,
}

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    )
    const existingCartItem = state.items[existingCartItemIndex]

    let updateItems
    // --------------------------------------
    if (existingCartItem) {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      }
      updateItems = [...state.items]
      updateItems[existingCartItemIndex] = updateItem
    } else {
      updateItems = state.items.concat(action.item)
    }
    //-------------------------------------------
    const updateTotalAmount =
      state.totalAmount + action.item.price * action.item.amount
    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
    }
  }

  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    )

    const existingItem = state.items[existingCartItemIndex]
    const updatedTotalAmount = state.totalAmount - existingItem.price
    let updatedItems
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id)
    } else {
      const updateItem = { ...existingItem, amount: existingItem.amount - 1 }
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updateItem
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }

  if (action.type === 'CLEAR') {
    return defaultCartState
  }
}

const CartProvider = (props) => {
  const [cartState, CartDispatch] = useReducer(cartReducer, defaultCartState)
  const addItemToCartHandler = (item) => {
    CartDispatch({
      type: 'ADD',
      item,
    })
  }
  const removeItemFromCartHandler = (id) => {
    CartDispatch({
      type: 'REMOVE',
      id,
    })
  }

  const clearCartHandler = () => {
    CartDispatch({ type: 'CLEAR' })
  }
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  }
  return (
    <div>
      <CartContext.Provider value={cartContext}>
        {props.children}
      </CartContext.Provider>
    </div>
  )
}

export default CartProvider
