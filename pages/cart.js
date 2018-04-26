import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import Router from 'next/router'
import Head from '../components/Head'
import Nav from '../components/Nav'

const {publicRuntimeConfig} = getConfig()
const {CART_SERVICE} = publicRuntimeConfig

const checkoutSuccess = () => {
  localStorage.removeItem('cartId');
  Router.push('/thankyou')
}

const updateQuantity = async (item, callback) => {
  try {
    const res = await fetch(`${CART_SERVICE}/cartItems/${item.id}`, {
      body: JSON.stringify({quantity: item.quantity}),
      headers: {
        'content-type': 'application/json'
      },
      method: 'PUT',
      mode: 'cors',
    })
    const data = await res.json()
    callback(data)
  } catch (error) {
    console.log(error)
  }
}

const deleteItem = async (item, callback) => {
  try {
    const res = await fetch(`${CART_SERVICE}/cartItems/${item.id}`, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'DELETE',
      mode: 'cors',
    })
    const data = await res
    callback(item)
  } catch (error) {
    console.log(error)
  }
}

class Cart extends Component {
  constructor () {
    super()
    this.state = {
      cart: {}
    }
  }

  fetchCart = async () => {
    const cartId = localStorage.getItem("cartId")

    const res = await fetch(`${CART_SERVICE}/carts/${cartId}`)
    const data = await res.json()
    this.setState({
      cart: data
    })
  }

  componentDidMount = async () => {
    this.fetchCart()
  }

  checkout = async () => {
    try {
      const res = await fetch(`${CART_SERVICE}/checkout`, {
        body: JSON.stringify({id: this.state.cart.id}),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
      })
      const data = await res.json()
      checkoutSuccess()
    } catch (error) {
      console.log(error)
    }
  }

  increaseQuantity = (item) => {
    updateQuantity({...item, quantity: item.quantity + 1}, this.updateItemState)
  }

  decreaseQuantity = (item) => {
    if(item.quantity > 1) {
      updateQuantity({...item, quantity: item.quantity - 1}, this.updateItemState)
    }
  }

  updateItemState = (item) => {
    let items = this.state.cart.CartItems.slice()
    const itemIndex = items.findIndex(i => i.id === item.id)
    items = [...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1)]
    this.setState({
      cart: {
        ...this.state.cart,
        CartItems: items
      }
    })
  }

  removeItem = (item) => {
    console.log(item)
    let items = this.state.cart.CartItems.slice()
    items = items.filter(i => i.id !== item.id)
    this.setState({
      cart: {
        ...this.state.cart,
        CartItems: items
      }
    })
  }

  handleDelete = item => {
    deleteItem(item, this.removeItem)
  }

  render() {
    const { cart } = this.state
    const totalItems = cart.CartItems ? cart.CartItems.map(item => item.quantity).reduce((a, b) => a + b, 0) : 0

    return (
      <div>
        <Head />
        <Nav />
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
            <button onClick={() => this.checkout()}>Checkout</button>
          </div>
        }
      </div>
    )}
}

export default Cart
