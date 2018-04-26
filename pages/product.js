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
    const { price, name, img, id } = product
    const cartId = localStorage.getItem("cartId")
    const cartItem = {
      id,
      price,
      name,
      img,
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
        <div className={"container"}>
          <div className={"image-container"}>
            <img src={product.img.medium} />
          </div>
          <div className={"details-container"}>
            <h1>{product.name}</h1>
            <p>${product.price}</p>
            <p>{product.text}</p>
            <div>{
               cart.CartItems && cart.CartItems.map(item => item.itemId).includes(product.id)
              ?
                <button disabled={true}>Already Added</button>
              :
                <button onClick={() => this.addToCart(product)}>Add to Cart</button>
                }
              </div>
            </div>
        </div>
        <style jsx>{`
          .container {
            display: flex;
            padding: 3em;
          }

          .image-container {
            width: 50%;
          }

          .details-container {
            width: 50%;
            padding-left: 8%;
            padding-right: 8%;
          }
          img {
            max-width: 100%;
          }
        `}</style>
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
