import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import Head from '../components/Head'
import Nav from '../components/Nav'
import ProductPage from '../components/ProductPage'
import CartProvider from '../components/CartProvider'

const {publicRuntimeConfig} = getConfig()
const {PRODUCT_SERVICE, CART_SERVICE} = publicRuntimeConfig

const Product = ({ product }) => (
  <div>
    <Head />
    <CartProvider>
      <Nav />
      <ProductPage product={product}/>
    </CartProvider>
  </div>
)

Product.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`${PRODUCT_SERVICE}/product/${id}`)
  const product = await res.json()

  return { product }
}

export default Product
