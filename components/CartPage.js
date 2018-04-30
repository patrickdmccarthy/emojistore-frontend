import { Component } from 'react'

import CartItem from './CartItem'
import { updateQuantity, deleteItem, goToCheckout } from '../services/cart'

export default class CartPage extends Component {
  increaseQuantity = (item) => {
    updateQuantity({...item, quantity: item.quantity + 1}, this.props.updateItemState)
  }

  decreaseQuantity = (item) => {
    if(item.quantity > 1) {
      updateQuantity({...item, quantity: item.quantity - 1}, this.props.updateItemState)
    }
  }

  handleDelete = item => {
    deleteItem(item, this.props.removeItem)
  }

  render() {
  const {fetchCart, updateItemState, removeItem, cart} = this.props
  const totalPrice = cart && cart.CartItems ? cart.CartItems.map(item => item.price * item.quantity).reduce((a, b) => a + b, 0) : null

  return (
    <div className={'container'}>
      <h1>Your Cart</h1>
      { cart.CartItems && cart.CartItems.map((item, i) => (
        <CartItem
          decreaseQuantity={ () => this.decreaseQuantity(item) }
          increaseQuantity={ () => this.increaseQuantity(item) }
          handleDelete={ () => this.handleDelete(item) }
          key={i}
          {...item}
        />
      ))}
      { cart.CartItems &&
        <div className={'checkout-container'}>
          <p>Total: ${ totalPrice }</p>
          <button onClick={() => goToCheckout()}>Checkout</button>
        </div>
      }
      <style jsx>{`
      .container {
        padding: 1.5em 0;
        display: flex;
        max-width: 900px;
        flex-direction: column;
        margin: 0 auto;
      }

      .checkout-container {
        text-align: right;
      }
    `}</style>
    </div>
    )
  }
}
