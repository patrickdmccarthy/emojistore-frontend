import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()
const {PRODUCT_SERVICE} = publicRuntimeConfig

const Product = ({ product }) => (
  <div>
    <h1>The Product Page</h1>
    <p>{product.name} {product.symbol} - {product.price}</p>
  </div>
)

Product.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`${PRODUCT_SERVICE}/product/${id}`)
  const product = await res.json()

  return { product }
}

export default Product
