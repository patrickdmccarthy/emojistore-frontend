import { Component } from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()
const {PRODUCT_SERVICE, CART_SERVICE} = publicRuntimeConfig

const setUserId = () => {
  const randomId = Math.floor(Math.random() * 10E8)
  localStorage.setItem("userId", randomId)
}

const setCartId = async () => {
  const res = await fetch(`${CART_SERVICE}/carts`, {
    body: JSON.stringify({ userId: localStorage.getItem("userId") }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
  })
  const data = await res.json()
  localStorage.setItem("cartId", data.id)
}

class Index extends Component {
  componentDidMount = async function() {
    if (localStorage.getItem("userId") === null) {
      setUserId()
    }

    if (localStorage.getItem("cartId") === null) {
      setCartId()
    }
  }

  render() {
    const { products } = this.props;

    return (
      <div>
        <h1>The Emoji Store</h1>
        <p>Welcome</p>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link as={`/product/${product.id}`} href={`/product?id=${product.id}`}>
                <a>{product.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

Index.getInitialProps = async function() {
  const res = await fetch(`${PRODUCT_SERVICE}/products`)
  const data = await res.json()

  return {
    products: data.products
  }
}


export default Index
