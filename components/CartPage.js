import { Component } from 'react'
import { updateQuantity, deleteItem, checkout } from '../services/cart.js'

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
  const totalItems =  cart && cart.CartItems ? cart.CartItems.map(item => item.quantity).reduce((a, b) => a + b, 0) : 0

    return (
      <div>
        <h1>Your Cart {`(${totalItems})`}</h1>
        { cart.CartItems && cart.CartItems.map((item, i) => {
          const { img, name, price, quantity } = item
          return (
            <div key={i}>
              <img src={img.small} />
              <span>{name} - {`$${price}`}</span>
              <div>
                <button onClick={() => this.decreaseQuantity(item) }>-</button>
                Quantity: {quantity}
                <button onClick={() => this.increaseQuantity(item) }>+</button>
              </div>
              <div>
                <button onClick={() => this.handleDelete(item) }>Delete item</button>
              </div>
            </div>
          )
        })}
        { cart.CartItems &&
          <div>
            <p>Total: ${ cart.CartItems.map(item => item.price * item.quantity).reduce((a, b) => a + b, 0) }</p>
            <button onClick={() => checkout()}>Checkout</button>
          </div>
        }
      </div>
    )
  }
}
