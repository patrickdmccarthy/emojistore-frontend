import { Component } from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import MdShoppingCart from 'react-icons/lib/md/shopping-cart'

const {publicRuntimeConfig} = getConfig()
const {CART_SERVICE} = publicRuntimeConfig

class Nav extends Component {
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

  render() {
    const { cart } = this.state
    const totalItems = cart.CartItems ? cart.CartItems.map(item => item.quantity).reduce((a, b) => a + b, 0) : 0

    return (
      <div className={'nav-wrapper'}>
        <h1>McSocks</h1>

        <div className={'shopping-cart-container'}>
          <Link href={`/cart`}>
            <div>
              <MdShoppingCart size={25}/>
              <span>{ totalItems }</span>
            </div>
          </Link>
        </div>

        <style jsx>{`
          .nav-wrapper {
            width: 100%;
            background-color: gray;
            padding: 1em 3em;
            display: flex;
            justify-content: space-between;
          }

          .shopping-cart-container {
            display: flex;
            align-items: center;
            margin-right: 2em;
            cursor: pointer;
          }
        `}</style>
      </div>
    )
  }
}

export default Nav
