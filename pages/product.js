import { Component } from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import Head from '../components/Head'
import Nav from '../components/Nav'

const {publicRuntimeConfig} = getConfig()
const {PRODUCT_SERVICE, CART_SERVICE} = publicRuntimeConfig

class Product extends Component {
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

  addToCart = async (product) => {
    const { price, name, symbol, id } = product
    const cartId = localStorage.getItem("cartId")
    const cartItem = {
      id,
      price,
      name,
      symbol,
      cartId
    }

    const res = await fetch(`${CART_SERVICE}/cartItems`, {
      body: JSON.stringify(cartItem),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
    })
    const data = await res.json()
    this.setState({
      cart:{
        ...this.state.cart,
        CartItems: [...this.state.cart.CartItems, data]
      }
    })
  }

  render() {
    const { product } = this.props
    const { cart } = this.state

    return (
      <div>
        <Head />
        <Nav />
        <div>
          <h1>The Product Page</h1>
          <p>{product.name} {product.symbol} - {product.price}</p>
          {
             cart.CartItems && cart.CartItems.map(item => item.itemId).includes(product.id)
            ?
              <button disabled={true}>Already Added</button>
            :
              <button onClick={() => this.addToCart(product)}>Add to Cart</button>
              }
          <Link href={`/cart`}>
            <a>{`View Cart`}</a>
          </Link>
        </div>
      </div>
    )
  }
};



Product.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`${PRODUCT_SERVICE}/product/${id}`)
  const product = await res.json()

  return { product }
}

export default Product
