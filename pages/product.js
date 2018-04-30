import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import Nav from '../components/Nav'
import ProductPage from '../components/ProductPage'
import CartProvider from '../components/CartProvider'
import Layout from '../components/Layout'

const {publicRuntimeConfig} = getConfig()
const {PRODUCT_SERVICE, CART_SERVICE} = publicRuntimeConfig

const Product = ({ product }) => (
  <div>
    <Layout>
      <CartProvider>
        <Nav />
        <ProductPage product={product}/>
      </CartProvider>
    </Layout>
  </div>
)

Product.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`${PRODUCT_SERVICE}/product/${id}`)
  const product = await res.json()

  return { product }
}

export default Product
