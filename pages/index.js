import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()
const {PRODUCT_SERVICE} = publicRuntimeConfig

const Index = ({ products }) => (
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

Index.getInitialProps = async function() {
  const res = await fetch(`${PRODUCT_SERVICE}/products`)
  const data = await res.json()

  return {
    products: data.products
  }
}


export default Index
