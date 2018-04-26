import { Component, cloneElement } from 'react'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()
const {CART_SERVICE} = publicRuntimeConfig

class CartProvider extends Component {
  constructor () {
    super()
    this.state = {
      cart: {}
    }
  }

  componentDidMount = async () => {
    this.fetchCart()
  }

  fetchCart = async () => {
    const cartId = localStorage.getItem("cartId")

    const res = await fetch(`${CART_SERVICE}/carts/${cartId}`)
    const data = await res.json()

    this.setState({
      cart: data
    })
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
    let items = this.state.cart.CartItems.slice()
    items = items.filter(i => i.id !== item.id)
    this.setState({
      cart: {
        ...this.state.cart,
        CartItems: items
      }
    })
  }

  addItem = (item) => {
    this.setState({
      cart: {
        ...this.state.cart,
        CartItems: [...this.state.cart.CartItems, item]
      }
    })
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child =>
      cloneElement(child, {
        fetchCart: this.fetchCart,
        updateItemState: this.updateItemState,
        removeItem: this.removeItem,
        addItem: this.addItem,
        cart: this.state.cart
      }))

    return (
      <div>
        {childrenWithProps}
      </div>
    )
  }
}

export default CartProvider
