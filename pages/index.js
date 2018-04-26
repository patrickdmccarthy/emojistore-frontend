import { Component } from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import Head from '../components/Head'
import Nav from '../components/Nav'

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
        <Head />
        <Nav />
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link as={`/product/${product.id}`} href={`/product?id=${product.id}`}>
                <a>{product.name}</a>
              </Link>
            </li>
          ))}
        </ul>
        <style jsx>{`
          .hero {
            width: 100%;
            background-color: red;
            padding: 1em;
          }
        `}</style>
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
