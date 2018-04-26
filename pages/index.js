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
        <div className={"product-container"}>
          {products.map((product) => (
            <div key={product.id} className={"product"}>
              <Link as={`/product/${product.id}`} href={`/product?id=${product.id}`}>
                <div>
                  <div>
                    <img src={product.img.small} />
                  </div>
                  <a>{product.name}</a>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <style jsx>{`
          .hero {
            width: 100%;
            background-color: red;
            padding: 1em;
          }

          .product-container {
            padding: 5%;
            display: flex;
            flex-wrap: wrap;
          }
          .product {
            width: 33%;
            text-align: center;
            margin-bottom: 2em;
            cursor: pointer;
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
